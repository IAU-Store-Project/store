from django.db import models
from django.contrib.auth import get_user_model
from product.models import Product

User = get_user_model()


class Basket(models.Model):
    customer = models.OneToOneField(User)
    total = models.CharField()


class BasketProduct(models.Model):
    basket = models.ForeignKey(Basket)
    product = models.ForeignKey(Product)
    qty = models.CharField()
