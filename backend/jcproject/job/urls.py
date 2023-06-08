from django.urls import path

from .views import (
    JobDetailView, JobListCreateAPIView, RequirementDetailView,
    RequirementListCreateAPIView, ResponsibilityDetailView,
    ResponsibilityListCreateAPIView, CompanyJobs,JobApprovalListView)

urlpatterns = [
    path('', JobListCreateAPIView.as_view(), name="jobs"),
    path('<int:id>/', JobDetailView.as_view(), name="job"),
    path('responsibilities/',
         ResponsibilityListCreateAPIView.as_view(), name="responsibilities"),
    path('company-jobs/',
         CompanyJobs.as_view(), name="company-jobs"),
    path('approved-jobs/',
         JobApprovalListView.as_view(), name="approved-jobs"),
    path('responsibilities/<int:id>/', ResponsibilityDetailView.as_view(),
         name="responsibilites"),
    path('requirements/',
         RequirementListCreateAPIView.as_view(), name="requirements"),
    path('requirements/<int:id>/', RequirementDetailView.as_view(),
         name="reqiurement"),
]
