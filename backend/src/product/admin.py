from django.contrib import admin
from base.admin import BaseAdmin
from product.models import Product


@admin.action(description='Duplicate')
def duplicate(modeladmin, request, queryset):
    for object in queryset:
        pk = object.id
        object.id = None
        object.save()
        message = "dup from {} to {}".format(pk, object.id)
        #modeladmin.log_addition(request=request, object=object, message=message)


class ProductAdmin(BaseAdmin):
    list_display = ('pk', 'title', 'sku', 'price', 'category', 'stock', 'created', 'updated')
    list_filter = ('created', 'updated', 'brand')
    list_display_links = ('pk', 'title', 'sku')
    search_fields = ('title', 'brand', 'sku', 'price')
    date_hierarchy = 'created'
    actions = ['delete_selected', duplicate]


admin.site.register(Product, ProductAdmin)
