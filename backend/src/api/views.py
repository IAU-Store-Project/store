from rest_framework import generics
from rest_framework.response import Response


class ApiRoot(generics.GenericAPIView):
    name = 'api-root'

    def get(self, request, *args, **kwargs):
        return Response()
