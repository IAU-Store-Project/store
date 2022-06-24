from django.contrib import admin
from base.admin import BaseAdmin
from payment.models import Payment


class PaymentAdmin(BaseAdmin):
    list_display = ('pk', 'customer', 'total', 'success')
    list_filter = ('success', 'created', 'updated')
    list_display_links = ('pk', 'customer')
    search_fields = ('customer',)
    date_hierarchy = 'created'
    actions = ['delete_selected']
    readonly_fields = ('customer', 'total', 'currency', 'extras')


admin.site.register(Payment, PaymentAdmin)
