from rest_framework.generics import (ListAPIView, ListCreateAPIView,
                                     RetrieveAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     UpdateAPIView)

from .models import Job, Responsibility, Requirement
from .serializers import (JobSerializer,
                          ResponsibilitySerializer, RequirementSerializer)


class JobListCreateAPIView(ListCreateAPIView):
    serializer_class = JobSerializer
    queryset = Job.objects.all()


class JobDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    lookup_field = 'id'


class ResponsibilityListCreateAPIView(ListCreateAPIView):
    serializer_class = ResponsibilitySerializer
    queryset = Responsibility.objects.all()


class ResponsibilityDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = ResponsibilitySerializer
    queryset = Responsibility.objects.all()
    lookup_field = 'id'


class RequirementListCreateAPIView(ListCreateAPIView):
    serializer_class = RequirementSerializer
    queryset = Requirement.objects.all()


class RequirementDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = RequirementSerializer
    queryset = Requirement.objects.all()
    lookup_field = 'id'
