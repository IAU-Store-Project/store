import decimal
import json
import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from app.tasks import telegram_sender
from api.serializers import PaySerializer
from order.models import Order, OrderItems
from basket.models import Basket, BasketItems
from payment.models import Payment

DEFAULT_CURRENCY = getattr(settings, 'DEFAULT_CURRENCY', None)
GENERIC_ERROR_MSG = 'Transaction failed. Please try again.'

stripe.api_key = "sk_test_51L2DcCIPO0PKIySxhP6Sdj667Y42amXiKSmU3DQCCIY8zy7YzqavPPVQiiyi1CePsUOnwHzv6W95BRY9AUHBu8KQ0003OyDwpC"


class PayAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data
        customer = request.user
        response = {
            'success': False,
            'basket': None,
            'order': None,
            'data': None,
            'error': None
        }

        basket = Basket.objects.filter(
            customer_id=customer.pk,
            ordered=False
        ).first()

        if not basket:
            response['error'] = GENERIC_ERROR_MSG
            return Response(PaySerializer(response).data)

        order_amount = int(decimal.Decimal(basket.total) * 100)
        response['basket'] = basket.pk

        try:
            if 'payment_method_id' in data:
                intent = stripe.PaymentIntent.create(
                    amount=order_amount,
                    currency=DEFAULT_CURRENCY,
                    payment_method=data.get('payment_method_id'),
                    confirmation_method='manual',
                    confirm=True,
                    use_stripe_sdk=True if 'useStripeSdk' in data and data['useStripeSdk'] else None,
                )
                # After create, if the PaymentIntent's status is succeeded, fulfill the order.
            elif 'paymentIntentId' in data:
                # Confirm the PaymentIntent to finalize payment after handling a required action
                # on the client.
                intent = stripe.PaymentIntent.confirm(data['paymentIntentId'])
                # After confirm, if the PaymentIntent's status is succeeded, fulfill the order.

            response['data'] = json.loads(json.dumps(intent))

            if intent['status'] == 'succeeded':
                payment = Payment.objects.create(
                    customer=customer,
                    success=True,
                    total=order_amount,
                    currency=DEFAULT_CURRENCY,
                    payid=intent['status'],
                    extras=intent
                )
                basket.ordered = True
                basket.save()
                response['success'] = True

                order, _ = Order.objects.update_or_create(
                    customer=customer,
                    basket=basket,
                    is_paid=True,
                    amount=basket.total,
                    payment=payment
                )

                telegram_sender.delay(text="New Order! #{0}".format(order.pk))

                basket_items = BasketItems.objects.filter(
                    customer=customer,
                    basket=basket
                )

                for item in basket_items:
                    order_item, _ = OrderItems.objects.update_or_create(
                        customer=customer,
                        order=order,
                        product=item.product
                    )

                response['order'] = order.pk

            return Response(PaySerializer(response).data)
        except stripe.error.CardError as e:
            response['error'] = e.user_message
            return Response(PaySerializer(response).data)


def generate_response(intent):
    print("intent", intent.__dict__)
    status = intent['status']
    if status == 'requires_action' or status == 'requires_source_action':
        # Card requires authentication
        return Response(
            {'requiresAction': True, 'paymentIntentId': intent['id'], 'clientSecret': intent['client_secret']})
    elif status == 'requires_payment_method' or status == 'requires_source':
        # Card was not properly authenticated, suggest a new payment method
        return Response({'error': 'Your card was denied, please provide a new payment method'})
    elif status == 'succeeded':
        # Payment is complete, authentication not required
        # To cancel the payment you will need to issue a Refund (https://stripe.com/docs/api/refunds)
        print("💰 Payment received!")
        return Response({'clientSecret': intent['client_secret']})
