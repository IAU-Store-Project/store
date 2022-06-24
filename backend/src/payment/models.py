from django.db import models
from base.models import BaseModel
from django.contrib.auth import get_user_model
from django.conf import settings
from basket.models import Basket

DEFAULT_CURRENCY = getattr(settings, 'DEFAULT_CURRENCY', None)

User = get_user_model()


class Payment(BaseModel):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    success = models.BooleanField(default=False)
    total = models.FloatField(default=0)
    currency = models.CharField(max_length=5, default=DEFAULT_CURRENCY)
    payid = models.CharField(max_length=100, null=True)
    extras = models.JSONField(default=dict)

    def __str__(self):
        return "Payment #{0}".format(self.pk)
