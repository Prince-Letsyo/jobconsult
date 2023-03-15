from django.http import HttpResponsePermanentRedirect


class CustomRedirect(HttpResponsePermanentRedirect):
    allowed_schemes = ['ecommerce', 'http', 'https']
