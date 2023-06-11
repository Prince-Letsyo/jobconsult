from django.http import JsonResponse
from choices.serializers import CityDisplayField
from Utils.choices import (make_choices_data,read_data_from_file)


def get_cites_options(request):
    country_code = request.GET.get('country_code')
    options = {}

    if country_code:
        cities = read_data_from_file(
                                   file="./cities.json", filter_by=country_code)
        options = {item["name"].lower(): item["name"] for item in cities}        

    return JsonResponse(options)
