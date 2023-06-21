from django.urls import path

from .views import ( ApplicantDocCreateAPIView,
                     JobApplicationListCreateAPIView,
                    ApplicationListView,ApplicationRetrieveAPIView)

urlpatterns = [
    path('applications/',
         ApplicationListView.as_view(), name="applications"),
    path('applications/<int:id>',
         ApplicationRetrieveAPIView.as_view(), name="application"),
    path('job-applications/',
         JobApplicationListCreateAPIView.as_view(), name="job-applications"),
    path('applicant-docs/',
         ApplicantDocCreateAPIView.as_view(), name="applicant-docs"),
]
