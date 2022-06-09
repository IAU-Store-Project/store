from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from user.models import User


class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password', ('first_name', 'last_name'), 'last_login')}),
        ('Permissions', {'fields': (
            'is_active',
            'is_customer',
            'is_staff',
            'is_superuser',
            'groups',
            'user_permissions',
        )}),
    )
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': ('email', 'password1', 'password2')
            }
        ),
    )

    list_display = ('pk', 'email', 'first_name', 'last_name', 'is_staff', 'is_customer', 'last_login')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'is_customer')
    search_fields = ('email',)
    filter_horizontal = ('groups', 'user_permissions')
    date_hierarchy = 'date_joined'
    ordering = ('-pk',)


admin.site.register(User, UserAdmin)
