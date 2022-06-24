from django.db import models
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save

from base.models import BaseModel
from product.models import Product

User = get_user_model()


class Basket(BaseModel):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='basket')
    ordered = models.BooleanField(default=False)
    total = models.FloatField(default=0)

    def __str__(self):
        return "Basket #{0}".format(self.pk)


class BasketItems(BaseModel):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='basket_items')
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.FloatField(default=0)
    quantity = models.IntegerField(default=1)
    total = models.FloatField(default=0)


@receiver(post_save, sender=BasketItems)
def basket_items_calculate(sender, **kwargs):
    basket_items = kwargs['instance']
    price_of_product = Product.objects.get(pk=basket_items.product.pk)
    basket_items.price = basket_items.quantity * float(price_of_product.price)
    # total_cart_items = BasketItems.objects.filter(customer_id=basket_items.customer.pk)

    basket = Basket.objects.get(pk=basket_items.basket.pk)
    basket.total = basket_items.price
    basket.save()

    print("Signal is ready!: {0}".format(basket.total))
