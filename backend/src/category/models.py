from django.db import models
from base.models import BaseModel
from django.urls import reverse


class Category(BaseModel):
    name = models.CharField('Title', max_length=150)
    slug = models.CharField('Slug', max_length=150)
    is_active = models.BooleanField('Active', default=False)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('category-detail', kwargs={'pk': self.pk})

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
