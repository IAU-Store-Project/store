from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from base.permissions import IsCustomerOwner
from customer.address.serializers import AddressSerializer
from customer.models import Address


class AddressListCreateAPIView(ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated, IsCustomerOwner]

    def get_queryset(self):
        print("drf request.session.token", self.request.auth)
        print("drf request.session.user_id", self.request.auth.get('user_id'))

        return Address.objects.filter(customer=self.request.user).order_by('-pk')

    def perform_create(self, serializer):
        print("drf request.session.session_key", self.request.session.session_key)

        if self.request.user.is_authenticated:
            serializer.save(customer=self.request.user)


class AddressRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated, IsCustomerOwner]

    def get_queryset(self):
        return Address.objects.filter(customer=self.request.user)
