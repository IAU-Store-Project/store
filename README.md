# IAU Headless Store Project

## Setup

```shell
cp .env.example .env
nano .env
docker-compose build
docker-compose up -d
docker-compose exec app python manage.py loaddata ./address/address-data.json
python manage.py createsuperuser
docker-compose logs -f
```

## Contributors

* Aynur Salman
* Resul Takak
* Olgun Özlgun
