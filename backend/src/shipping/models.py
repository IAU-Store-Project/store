from django.db import models

from base.models import BaseModel

class Shipping(BaseModel):
   name = models.CharField(max_length=100)
   address = models.CharField(max_length=100)
