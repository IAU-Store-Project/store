from django.contrib.auth.models import User
from django.test import RequestFactory, TestCase
from django.urls import reverse

from brand.models import Brand
from brand.views import BrandListView, BrandCreateView, BrandDetailView


class BrandTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='johndoe',
            email='johndoe@example.com',
            password='top_secret',
            is_active=True,
            is_staff=True
        )
        self.brand = Brand.objects.create(name="Brand", is_active=True)

    def test_brand_model(self):
        self.assertEqual(self.brand.name, 'Brand')
        self.assertEqual(self.brand.is_active, True)

    def test_brands(self):
        request = self.factory.get('/product/brands/')
        request.user = self.user
        response = BrandListView.as_view()(request)
        self.assertEqual(response.status_code, 200)

    def test_brand_create_get(self):
        request = self.factory.get('/product/brands/create')
        request.user = self.user
        response = BrandCreateView.as_view()(request)
        self.assertEqual(response.status_code, 200)

    def test_brand_detail(self):
        request = self.factory.get(
            reverse('brand-detail', kwargs={'pk': self.brand.pk})
        )
        request.user = self.user
        response = BrandDetailView.as_view()(request, **{'pk': self.brand.pk})
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.brand.name)
        self.assertTrue(response, self.brand.is_active)

    def test_brand_detail_fail(self):
        response = self.client.get(
            reverse('brand-detail', kwargs={'pk': self.brand.pk})
        )
        self.assertEqual(response.status_code, 302)
