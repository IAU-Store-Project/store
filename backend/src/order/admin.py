from django.contrib import admin

from base.admin import BaseAdmin
from order.models import Order, OrderItems


class OrderAdmin(BaseAdmin):
    # list_display = ('pk', 'customer', 'total', 'ordered')
    # list_filter = ('ordered', 'created', 'updated')
    # list_display_links = ('pk', 'customer')
    # search_fields = ('customer',)
    date_hierarchy = 'created'
    actions = ['delete_selected']


class OrderItemsAdmin(BaseAdmin):
    # list_display = ('pk', 'customer', 'basket', 'product', 'price', 'quantity', 'total')
    # list_filter = ('created', 'updated')
    # list_display_links = ('pk', 'customer', 'basket', 'product')
    # search_fields = ('customer', 'basket', 'product')
    date_hierarchy = 'created'
    actions = ['delete_selected']


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItems, OrderItemsAdmin)
