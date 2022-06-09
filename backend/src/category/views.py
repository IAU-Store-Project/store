from django.urls import reverse_lazy
from django.shortcuts import redirect
from django.contrib import messages
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView, DetailView, RedirectView
from base.permissions import GeneralPermission
from category.models import Category


class CategoryPermission(GeneralPermission):
    pass


class BaseCategoryView(CategoryPermission):
    model = Category
    title = 'Category'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = self.title
        return context


class CategoryCreateView(BaseCategoryView, CreateView):
    fields = '__all__'
    template_name = 'categories/category_form.html'


class CategoryUpdateView(BaseCategoryView, UpdateView):
    fields = '__all__'
    template_name = 'categories/category_form.html'


class CategoryDeleteView(BaseCategoryView, DeleteView):
    fields = '__all__'
    template_name = 'categories/category_confirm.html'
    success_url = reverse_lazy('categories')


class CategoryDetailView(BaseCategoryView, DetailView):
    template_name = 'categories/category_detail.html'


class CategoryListView(BaseCategoryView, ListView):
    title = 'Categories'
    context_object_name = 'categories'
    template_name = 'categories/categories.html'
    ordering = '-pk'


class CategoryStatusRedirectView(BaseCategoryView, RedirectView):
    def get(self, request, *args, **kwargs):
        uri = self.kwargs.get('uri', 'list')
        try:
            category = Category.objects.get(pk=self.kwargs.get('pk'))

            if category.is_active:
                category.is_active = False
            else:
                category.is_active = True

            category.save()
            messages.success(self.request, "Successful!")
        except Category.DoesNotExist:
            messages.success(self.request, "Unsuccessful!")
            uri = 'list'

        if uri == 'list':
            return redirect(reverse_lazy('categories'))

        return redirect(category.get_absolute_url())
