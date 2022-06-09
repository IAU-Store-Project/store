from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view

# from api.views import ApiRoot

urlpatterns = [
    # path('', ApiRoot.as_view()),
    path('auth/', include('user.api')),
    path('brands/', include('brand.api')),
    path('categories/', include('category.api')),
    path('products/', include('product.api')),
    path('addresses/', include('customer.address.api')),
    path('openapi', get_schema_view(
        title="IAU Store API",
        description="IAU Store API for E-Commerce Frontend",
        version="1.0.0"
    ), name='openapi-schema'),
    path('docs', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),
]
