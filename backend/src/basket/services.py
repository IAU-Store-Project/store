from django.core import cache


class BasketStoreService(object):

    def get_cache_key(self):
        pass

    def get_basket(self):
        pass

    def save_basket(self, customer, products, **kwargs):
        pass
