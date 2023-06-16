from django.urls import path

from .views import (
    RequirementDestroyAPIView, ResponsibilityDestroyAPIView,
    JobApprovalListView) 

urlpatterns = [
    path('approved-jobs/',
         JobApprovalListView.as_view(), name="approved-jobs"),
    path('responsibilities/<int:id>/', ResponsibilityDestroyAPIView.as_view(),
         name="responsibilites"),
    path('requirements/<int:id>/', RequirementDestroyAPIView.as_view(),
         name="reqiurement"),
]
