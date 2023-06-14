from django.urls import path


from .views import (GenericChoiceAPIView, CountryListView,
                    CityListView, NationalityList,get_cites_options)

urlpatterns = [
    path("",
         GenericChoiceAPIView.as_view(), name="genric-choices"),
    path("nationalities/",
         NationalityList.as_view(), name="nationality-list"),
    path("countries/",
         CountryListView.as_view(), name="country-list"),
    path("cities/",
         CityListView.as_view(), name="city-list"),
    path("admin/cities/",
        get_cites_options, name="admin-city-list"),
]
