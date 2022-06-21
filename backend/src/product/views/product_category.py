from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView, DetailView
from product.models import ProductCategory
from base.permissions import GeneralPermission


class BaseProductCategoryView(GeneralPermission):
    model = ProductCategory

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = self.title
        return context


class ProductCategoryListView(BaseProductCategoryView, ListView):
    title = 'Product Categories'
    template_name = 'product_category/categories.html'
    context_object_name = 'categories'
    ordering = '-pk'


class ProductCategoryCreateView(BaseProductCategoryView, CreateView):
    title = 'Product Create'
    fields = '__all__'
    template_name = 'product/product_form.html'


class ProductCategoryDeleteView(BaseProductCategoryView, DeleteView):
    title = 'Product Delete'
    fields = '__all__'
    template_name = 'product/product_confirm.html'
    success_url = reverse_lazy('product-list')
