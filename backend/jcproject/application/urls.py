from django.urls import path

from .views import (ApplicantDocDetailView, ApplicantDocListCreateAPIView,
                    JobApplicationDetailView, JobApplicationListCreateAPIView)

urlpatterns = [
    path('job-applications/',
         JobApplicationListCreateAPIView.as_view(), name="job-applicationa"),
    path('job-applications/<int:id>/',
         JobApplicationDetailView.as_view(), name="job-application"),
    path('applicant-docs/',
         ApplicantDocListCreateAPIView.as_view(), name="applicant-docs"),
    path('applicant-docs/<int:id>/',
         ApplicantDocDetailView.as_view(), name="applicant-doc"),
]
