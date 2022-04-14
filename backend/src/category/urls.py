from django.urls import path
from category.views import categories, new_category


urlpatterns = [
    path('', categories, name="categories"),
    path('new', new_category, name="new_category"),
]
