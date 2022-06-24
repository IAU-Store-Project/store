from django.db import models


class Country(models.Model):
    name = models.CharField(max_length=60)
    iso3 = models.CharField(max_length=5)
    iso2 = models.CharField(max_length=5)
    phone_code = models.CharField(max_length=10)
    currency = models.CharField(max_length=20)
    currency_name = models.CharField(max_length=20)
    currency_symbol = models.CharField(max_length=20)
    timezone = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class State(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='state_country')
    name = models.CharField(max_length=60)


class City(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='city_country')
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='city_country')
    name = models.CharField(max_length=60)
