from django.db import models

from product.enums import ProductUnits
from category.models import Category

UNITS_CHOICES = {
    (ProductUnits.QTY, ProductUnits.QTY),
    (ProductUnits.ITEMS, ProductUnits.ITEMS),
    (ProductUnits.KG, ProductUnits.KG)
}


class Product(models.Model):
    title = models.CharField('Product')
    price = models.DecimalField("Price", max_length=12, decimal_places=4)
    stock = models.DecimalField("Stok", max_length=8, decimal_places=4)
    unit = models.CharField("Unit", choices=UNITS_CHOICES, default=ProductUnits.QTY)

    def __str__(self):
        return "{0} - {1} - {2}".format(self.title, self.price, self.stock)


class ProductCategory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return "{0} - {1} - {2}".format(self.product.title, self.category.name)
