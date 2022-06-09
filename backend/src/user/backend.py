from django.contrib.auth.hashers import check_password
from user.models import User


class UserBackend:

    def authenticate(self, request, email=None, password=None):
        if email and password:
            try:
                user = User.objects.get(email=email)
                if check_password(password, user.password):
                    if user.is_active:
                        return user
            except User.DoesNotExist:
                return None
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
