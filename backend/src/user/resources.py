from rest_framework import status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from django.http import Http404
from django.utils import timezone
from django.contrib.auth import get_user_model

from user.serializers import RegisterSerializer, UserSerializer, UserUpdateSerializer

User = get_user_model()


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        try:
            user = self.get_object(pk=self.request.user.pk)
            user.last_login = timezone.now()
            user.save(update_fields=["last_login"])
        except User.DoesNotExist:
            pass

        return Response(UserSerializer(user).data)

    def put(self, request):
        user = self.get_object(pk=self.request.user.pk)
        serializer = UserUpdateSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
