from django.db import models


class BaseModel(models.Model):
    created = models.DateTimeField("Created Time", auto_now_add=True, editable=False)
    updated = models.DateTimeField("Updated Time", auto_now=True, editable=False)

    class Meta:
        abstract = True
