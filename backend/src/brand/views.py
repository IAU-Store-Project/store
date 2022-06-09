from django.urls import reverse_lazy
from django.shortcuts import redirect
from django.contrib import messages
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView, DetailView, RedirectView
from base.permissions import GeneralPermission
from product.models import Brand


class BrandPermission(GeneralPermission):
    pass


class BaseBrandView(BrandPermission):
    model = Brand
    title = 'Brands'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = self.title
        return context


class BrandListView(BaseBrandView, ListView):
    template_name = 'brand/brand_list.html'
    context_object_name = 'brands'
    ordering = '-pk'


class BrandCreateView(BaseBrandView, CreateView):
    fields = '__all__'
    template_name = 'brand/brand_form.html'


class BrandDetailView(BaseBrandView, DetailView):
    template_name = 'brand/brand_detail.html'


class BrandUpdateView(BaseBrandView, UpdateView):
    fields = '__all__'
    template_name = 'brand/brand_form.html'


class BrandDeleteView(BaseBrandView, DeleteView):
    fields = '__all__'
    template_name = 'brand/brand_confirm.html'
    success_url = reverse_lazy('brand-list')


class BrandStatusView(BaseBrandView, RedirectView):
    def get(self, request, *args, **kwargs):
        uri = self.kwargs.get('uri', 'list')

        try:
            brand = Brand.objects.get(pk=self.kwargs.get('pk'))

            if brand.is_active:
                brand.is_active = False
            else:
                brand.is_active = True

            brand.save()

            messages.success(self.request, "Successful!")
        except Brand.DoesNotExist:
            messages.success(self.request, "Unsuccessful!")
            return redirect(reverse_lazy('brand-list'))

        if uri == 'list':
            return redirect(reverse_lazy('brand-list'))

        return redirect(brand.get_absolute_url())
