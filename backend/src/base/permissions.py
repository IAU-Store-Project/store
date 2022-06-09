from django.urls import reverse_lazy
from django.shortcuts import redirect
from django.contrib import messages
from rest_framework import permissions
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin


class GeneralPermission(LoginRequiredMixin, PermissionRequiredMixin):
    raise_exception = False

    def handle_no_permission(self):
        messages.error(self.request, "Access denied.")
        return redirect(reverse_lazy('home'))

    def has_permission(self):
        return self.request.user.is_staff or self.request.user.is_superuser


class IsCustomerOwner(permissions.BasePermission):
    message = "You must login!"

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.customer == request.user


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user
