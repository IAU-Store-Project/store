import json
from django.core.management.base import BaseCommand, CommandError
from address.models import Country, State, City


class Command(BaseCommand):
    help = 'Import Country State and City'

    def handle(self, *args, **kwargs):
        with open('countries+states+cities.json', 'r') as f:
            data = json.load(f)

        for c in data:
            country, _ = Country.objects.update_or_create(
                name=c.get('name'),
                iso3=c.get('iso3'),
                iso2=c.get('iso2'),
                phone_code=c.get('phone_code'),
                currency=c.get('currency'),
                currency_name=c.get('currency_name'),
                currency_symbol=c.get('currency_symbol'),
                timezone=c['timezones'][0]['zoneName']
            )
            for s in c.get('states'):
                state, _ = State.objects.update_or_create(
                    country=country,
                    name=s.get('name')
                )
                for z in s.get('cities'):
                    city, _ = City.objects.update_or_create(
                        country=country,
                        state=state,
                        name=z.get('name')
                    )

        self.stdout.write(self.style.SUCCESS('OK'))
