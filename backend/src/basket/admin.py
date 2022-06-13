from django.contrib import admin
from base.admin import BaseAdmin
from basket.models import Basket, BasketItems


class BasketAdmin(BaseAdmin):
    list_display = ('pk', 'customer', 'total', 'ordered')
    list_filter = ('ordered', 'created', 'updated')
    list_display_links = ('pk', 'customer')
    search_fields = ('customer',)
    date_hierarchy = 'created'
    actions = ['delete_selected']


class BasketItemsAdmin(BaseAdmin):
    list_display = ('pk', 'customer', 'basket', 'product', 'price', 'quantity', 'total')
    list_filter = ('created', 'updated')
    list_display_links = ('pk', 'customer', 'basket', 'product')
    search_fields = ('customer', 'basket', 'product')
    date_hierarchy = 'created'
    actions = ['delete_selected']


admin.site.register(Basket, BasketAdmin)
admin.site.register(BasketItems, BasketItemsAdmin)
