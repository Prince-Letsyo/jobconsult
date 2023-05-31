from rest_framework import serializers

class ChoicesDisplayField(serializers.Field):
    def to_representation(self, value):
        return [
            {"key": choice[0], "value": choice[1]}
            for choice in value.choices

        ]