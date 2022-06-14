from django.db import models
from django.contrib.auth import get_user_model

from address.models import Country, State, City
from base.models import BaseModel

User = get_user_model()


class Address(BaseModel):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="address")
    title = models.CharField("Address Title", max_length=50)
    address = models.CharField("Address Line", max_length=100)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='city')
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='state')
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='country')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"
