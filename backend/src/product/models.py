from django.db import models
from django.urls import reverse
from django.conf import settings

from brand.models import Brand
from product.enums import ProductUnits
from category.models import Category
from base.models import BaseModel

IMAGE_UPLOAD_DIR = getattr(settings, 'IMAGE_UPLOAD_DIR', 'uploads/images')

UNITS_CHOICES = {
    (ProductUnits.QTY, ProductUnits.QTY),
    (ProductUnits.ITEMS, ProductUnits.ITEMS),
    (ProductUnits.KG, ProductUnits.KG)
}


class Product(BaseModel):
    brand = models.ForeignKey(
        Brand,
        models.SET_NULL,
        limit_choices_to={"is_active": True},
        related_name="product_brand",
        null=True
    )
    title = models.CharField('Product', max_length=160)
    sku = models.CharField('SKU', max_length=12)
    price = models.DecimalField("Price", max_length=12, max_digits=12, decimal_places=4)
    stock = models.DecimalField("Quantity", max_length=8, max_digits=8, decimal_places=4)
    unit = models.CharField("Unit", choices=UNITS_CHOICES, default=ProductUnits.QTY, max_length=5)
    img = models.ImageField(
        upload_to=settings.IMAGE_UPLOAD_DIR,
        max_length=120
    )

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('product-detail', kwargs={'pk': self.pk})


class ProductCategory(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='categories')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return "{0} - {1}".format(self.product.title, self.category.name)

    def get_absolute_url(self):
        return reverse('product-detail', kwargs={'pk': self.pk})
