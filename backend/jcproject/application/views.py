from rest_framework.generics import (ListAPIView, ListCreateAPIView,
                                     RetrieveAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     UpdateAPIView)

from .models import Application, JobApplication, ApplicantDoc
from .serializers import JobApplicationSerializer, ApplicantDocSerializer
from Utils import MainRenderer



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
