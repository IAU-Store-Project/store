from django.contrib import admin
from base.admin import BaseAdmin
from category.models import Category


class CategoryAdmin(BaseAdmin):
    list_display = ('pk', 'name', 'slug', 'is_active', 'created', 'updated')
    list_filter = ('is_active', 'created', 'updated')
    list_display_links = ('pk', 'name', 'slug')
    search_fields = ('name', 'slug')
    date_hierarchy = 'created'
    actions = None


admin.site.register(Category, CategoryAdmin)
