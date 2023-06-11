from django_countries.serializer_fields import CountryField
from rest_framework import serializers


class ChoicesDisplayField(serializers.Field):
    def to_representation(self, value):
        return [
            {"key": choice[0], "value": choice[1]}
            for choice in value.choices
        ]

class CountryDisplayField(serializers.Field):
    def to_representation(self, value):
        return [
            {"key": choice[0], "value": choice[1]}
            for choice in value
        ]



class CityDisplayField(CountryDisplayField):
    pass