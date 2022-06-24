from order.models import Order
from base.permissions import GeneralPermission
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView


class BaseOrderView(GeneralPermission):
    model = Order

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = self.title
        return context


class OrderListView(BaseOrderView, ListView):
    title = 'Orders'
    template_name = 'order/order_list.html'
    context_object_name = 'orders'
    ordering = '-pk'


class OrderDetailView(BaseOrderView, DetailView):
    title = 'Order Detail'
    template_name = 'order/order_detail.html'
