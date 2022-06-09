from django.contrib import admin

from base.admin import BaseAdmin
from brand.models import Brand


class BrandAdmin(BaseAdmin):
    list_display = ('pk', 'name', 'is_active', 'created', 'updated')
    list_filter = ('is_active', 'created', 'updated')
    list_display_links = ('pk', 'name')
    search_fields = ('name',)
    date_hierarchy = 'created'
    actions = ['delete_selected']


admin.site.register(Brand, BrandAdmin)
