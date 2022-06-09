from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView, DetailView
from product.models import Product
from django.conf import settings
from base.permissions import GeneralPermission

DEFAULT_CURRENCY = getattr(settings, 'DEFAULT_CURRENCY', None)


class BaseProductView(GeneralPermission):
    model = Product

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = self.title
        context['default_currency'] = DEFAULT_CURRENCY
        return context


class ProductCreateView(BaseProductView, CreateView):
    title = 'Product Create'
    fields = '__all__'
    template_name = 'product/product_form.html'


class ProductUpdateView(BaseProductView, UpdateView):
    title = 'Product Update'
    fields = '__all__'
    template_name = 'product/product_form.html'


class ProductDeleteView(BaseProductView, DeleteView):
    title = 'Product Delete'
    fields = '__all__'
    template_name = 'product/product_confirm.html'
    success_url = reverse_lazy('product-list')


class ProductDetailView(BaseProductView, DetailView):
    title = 'Product Detail'
    template_name = 'product/product_detail.html'


class ProductListView(BaseProductView, ListView):
    title = 'Product List'
    template_name = 'product/product_list.html'
    context_object_name = 'products'
    ordering = '-pk'
