from django.db import models
from django.contrib.auth import get_user_model
from product.models import Product

User = get_user_model()


class Basket(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='basket')
    total = models.CharField(max_length=22)


# class BasketProduct(models.Model):
#     basket = models.ForeignKey(Basket)
#     product = models.ForeignKey(Product)
#     qty = models.CharField()
