FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1
ENV DJANGO_ENV dev
ENV DOCKER_CONTAINER 1

RUN mkdir /app
WORKDIR /app
ADD ./src .

EXPOSE 8000

RUN pip install -U pip && pip install -r requirements.txt

COPY ./patch/utils.py /usr/local/lib/python3.9/site-packages/graphene_django/utils/utils.py

RUN python manage.py collectstatic --noinput

# CMD gunicorn core.wsgi:application -b 0.0.0.0:8000
