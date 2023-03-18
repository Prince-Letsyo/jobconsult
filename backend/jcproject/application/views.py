from rest_framework.generics import (ListAPIView, ListCreateAPIView,
                                     RetrieveAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     UpdateAPIView)

from .models import Application, JobApplication, ApplicantDoc
from .serializers import ApplicationSerializer, JobApplicationSerializer, ApplicantDocSerializer
from Utils import MainRenderer


class ApplicationListAPIView(ListAPIView):
    serializer_class = ApplicationSerializer
    renderer_classes=(MainRenderer,)
    queryset = Application.objects.all()


class ApplicationDetailAPIView(UpdateAPIView, RetrieveAPIView):
    serializer_class = ApplicationSerializer
    renderer_classes=(MainRenderer,)
    queryset = Application.objects.all()
    lookup_field = 'id'


class JobApplicationListCreateAPIView(ListCreateAPIView):
    serializer_class = JobApplicationSerializer
    renderer_classes=(MainRenderer,)
    queryset = JobApplication.objects.all()


class JobApplicationDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = JobApplicationSerializer
    renderer_classes=(MainRenderer,)
    queryset = JobApplication.objects.all()
    lookup_field = 'id'


class ApplicantDocListCreateAPIView(ListCreateAPIView):
    serializer_class = ApplicantDocSerializer
    renderer_classes=(MainRenderer,)
    queryset = ApplicantDoc.objects.all()


class ApplicantDocDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = ApplicantDocSerializer
    renderer_classes=(MainRenderer,)
    queryset = ApplicantDoc.objects.all()
    lookup_field = 'id'
