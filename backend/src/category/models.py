from django.db import models


class Category(models.Model):

    name = models.CharField('Kategori Adı', max_length=150)
    slug = models.CharField('Kategori Slug', max_length=150)
    is_active = models.BooleanField('Durum', default=False)

    class Meta:
        verbose_name = 'Kategori'
        verbose_name_plural = 'Kategoriler'

    def __str__(self):
        return "{0} - {1}".format(self.name, self.slug)
