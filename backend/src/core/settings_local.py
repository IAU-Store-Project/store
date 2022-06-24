import environ
from datetime import timedelta
from django.contrib.messages import constants as messages
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

env = environ.Env(
    DEBUG=(bool, False)
)
sentry_sdk.init(
    dsn=env('SENTRY_DSN'),
    integrations=[
        DjangoIntegration(),
    ],
    traces_sample_rate=1.0,
    send_default_pii=True
)

MESSAGE_TAGS = {
    messages.ERROR: 'danger',
}

LOGIN_URL = '/app/signin'
AUTH_USER_MODEL = 'user.User'
AUTHENTICATION_BACKENDS = ['user.backend.UserBackend', 'django.contrib.auth.backends.ModelBackend']

SESSION_ENGINE = 'django.contrib.sessions.backends.cache'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': env('CACHE_URL'),
    }
}

# https://www.django-rest-framework.org/api-guide/authentication/
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'SAMEORIGIN'

DEFAULT_CURRENCY = env('DEFAULT_CURRENCY')
DEFAULT_CURRENCY_PREFIX = '$' #env('DEFAULT_CURRENCY_PREFIX')

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5000",
    "http://localhost:5000",
    "https://iau-store.com",
]

CORS_URLS_REGEX = r"^/api/.*$"

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "POST",
    "PUT",
]

# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=10),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': env('SECRET_KEY'),
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

IMAGE_UPLOAD_DIR = 'uploads/images'

CRISPY_TEMPLATE_PACK = 'bootstrap4'

#STATIC_URL = '/django_static/'

ELASTICSEARCH_DSL = {
    'default': {
        'hosts': env('ELASTICSEARCH_URL')
    },
}
ELASTICSEARCH_INDEX_NAMES = {
    'product.product': 'products',
}

CELERY_BROKER_URL = env("CELERY_BROKER")
CELERY_RESULT_BACKEND = env("CELERY_BACKEND")
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TIMEZONE = "UTC"
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_SERIALIZER = 'json'

TELEGRAM_CHAT_ID = env('TELEGRAM_CHAT_ID')
TELEGRAM_TOKEN = env('TELEGRAM_TOKEN')

GRAPHENE = {
    "SCHEMA": "core.schema.schema"
}
