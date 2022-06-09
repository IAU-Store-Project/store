from django.db import models
from django.contrib.auth import get_user_model

from base.models import BaseModel

User = get_user_model()


class Address(BaseModel):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="address")
    title = models.CharField("Address Title", max_length=50)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"
