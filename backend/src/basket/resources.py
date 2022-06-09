from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from basket.models import Basket
from basket.serializers import BasketSerializer


class BasketListCreateAPIView(ListCreateAPIView):
    serializer_class = BasketSerializer
    queryset = Basket.objects.filter()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        print("serializer", serializer)
        print("self.request.user", self.request.user)
        serializer.save(user=self.request.user)


# class BasketRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
#     serializer_class = BasketSerializer
#     queryset = Basket.objects.all()
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     lookup_field = 'pk'
