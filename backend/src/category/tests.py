from django.contrib.auth.models import AnonymousUser, User
from django.test import RequestFactory, TestCase
from django.urls import reverse

from category.models import Category
from category.views import (
    CategoryListView,
    CategoryCreateView,
    CategoryDetailView,
    CategoryUpdateView,
    CategoryDeleteView,
    CategoryStatusRedirectView
)


class CategoryTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='johndoe',
            email='johndoe@example.com',
            password='top_secret',
            is_active=True,
            is_staff=True
        )
        self.category = Category.objects.create(name="mobile", slug="mobile")

    def test_category_model(self):
        category = Category.objects.get(name="mobile")
        self.assertEqual(category.slug, 'mobile')

    def test_categories(self):
        request = self.factory.get('/product/categories/')
        request.user = self.user
        response = CategoryListView.as_view()(request)
        self.assertEqual(response.status_code, 200)

    def test_category_create_get(self):
        request = self.factory.get('/product/categories/create')
        request.user = self.user
        response = CategoryCreateView.as_view()(request)
        self.assertEqual(response.status_code, 200)

    def test_category_detail(self):
        request = self.factory.get(reverse('category-detail', kwargs={'pk': self.category.pk}))
        request.user = self.user
        response = CategoryDetailView.as_view()(request, **{'pk': self.category.pk})
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.category.name)
        self.assertContains(response, self.category.slug)

    def test_category_detail_fail(self):
        response = self.client.get(reverse('category-detail', kwargs={'pk': self.category.pk}))
        self.assertEqual(response.status_code, 302)


# https://docs.djangoproject.com/en/4.0/topics/testing/advanced/
