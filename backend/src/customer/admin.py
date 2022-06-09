from django.contrib import admin

from customer.models import Address


class AddreessModel(admin.ModelAdmin):
    list_display = ('pk', 'customer', 'title')


admin.site.register(Address, AddreessModel)
