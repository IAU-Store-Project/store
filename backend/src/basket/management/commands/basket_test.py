# TODO MUST DELETE
from django.core.management.base import BaseCommand
from django.core.cache import cache
from django.contrib.auth import get_user_model

from basket.services import BasketStoreService
from product.models import Product

User = get_user_model()


class Command(BaseCommand):
    help = 'basket_test'

    def handle(self, *args, **options):

        customer = User.objects.get(pk=2)

        service = BasketStoreService()

        products = [1, 1, 1]

        result = service.save_basket(
            customer=customer,
            products=products,
        )

        self.stdout.write(self.style.SUCCESS("Test OK: {0}".format(result)))
