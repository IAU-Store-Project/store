from django.contrib import admin

from base.admin import BaseAdmin
from order.models import Order, OrderItems


class OrderAdmin(BaseAdmin):
    list_display = ('pk', 'customer', 'amount', 'is_paid')
    list_filter = ('is_paid', 'created', 'updated')
    list_display_links = ('pk', 'customer')
    search_fields = ('customer',)
    date_hierarchy = 'created'
    actions = ['delete_selected']


class OrderItemsAdmin(BaseAdmin):
    list_display = ('pk', 'customer', 'order', 'product')
    list_filter = ('created', 'updated')
    list_display_links = ('pk', 'customer', 'order', 'product')
    search_fields = ('customer', 'order', 'product')
    date_hierarchy = 'created'
    actions = ['delete_selected']


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItems, OrderItemsAdmin)
