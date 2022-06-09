from django.db import models
from django.urls import reverse

from base.models import BaseModel


class Brand(BaseModel):
    name = models.CharField("Brand Name", max_length=80)
    is_active = models.BooleanField("Active", default=False, blank=True)

    def get_absolute_url(self):
        return reverse('brand-detail', kwargs={'pk': self.pk})

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Brand'
        verbose_name_plural = 'Brands'
