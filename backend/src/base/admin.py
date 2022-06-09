from django.contrib import admin
from product.models import Product, ProductCategory, Brand


class BaseAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser
