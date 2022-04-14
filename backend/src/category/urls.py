from django.urls import path
from category.views import CategoryListView, new_category


urlpatterns = [
    path('', CategoryListView.as_view(), name="categories"),
    path('new', new_category, name="new_category"),
]
