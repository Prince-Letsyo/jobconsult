from django.urls import path

from .views import (
    JobDetailView, JobListCreateAPIView,
    RequirementDestroyAPIView, ResponsibilityDestroyAPIView,
    JobApprovalListView)

urlpatterns = [
    path('', JobListCreateAPIView.as_view(), name="jobs"),
    path('<int:id>/', JobDetailView.as_view(), name="job"),
    path('approved-jobs/',
         JobApprovalListView.as_view(), name="approved-jobs"),
    path('responsibilities/<int:id>/', ResponsibilityDestroyAPIView.as_view(),
         name="responsibilites"),
    path('requirements/<int:id>/', RequirementDestroyAPIView.as_view(),
         name="reqiurement"),
]
