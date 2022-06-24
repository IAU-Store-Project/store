from __future__ import absolute_import, unicode_literals

import requests
from celery import shared_task
from django.conf import settings

TELEGRAM_TOKEN = getattr(settings, 'TELEGRAM_TOKEN', None)
TELEGRAM_CHAT_ID = getattr(settings, 'TELEGRAM_CHAT_ID', None)

@shared_task(bind=True)
def telegram_sender(self, text):
    url = "https://api.telegram.org/bot{0}/sendMessage".format(TELEGRAM_TOKEN)
    payload = "chat_id={0}&text={1}".format(TELEGRAM_CHAT_ID, text)
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.request(
        "POST",
        url,
        headers=headers,
        data=payload
    )

    return response.text
