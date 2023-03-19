from django.urls import path

from .views import (
    JobDetailView, JobListCreateAPIView, RequirementDetailView,
    RequirementListCreateAPIView, ResponsibilityDetailView,
    ResponsibilityListCreateAPIView)

urlpatterns = [
    path('', JobListCreateAPIView.as_view(), name="jobs"),
    path('<int:id>', JobDetailView.as_view(), name="job"),
    path('responsibilities',
         ResponsibilityListCreateAPIView.as_view(), name="responsibilities"),
    path('responsibilities/<int:id>', ResponsibilityDetailView.as_view(),
         name="responsibilites"),
    path('requirements',
         RequirementListCreateAPIView.as_view(), name="requirements"),
    path('requirements/<int:id>', RequirementDetailView.as_view(),
         name="reqiurement"),
]
