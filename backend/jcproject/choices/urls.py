from django.urls import path


from .views import (GenericChoiceAPIView)

urlpatterns = [
    path("<str:choice>/",
         GenericChoiceAPIView.as_view(), name="genric-choices")
]
