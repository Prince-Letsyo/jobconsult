import math
from rest_framework.generics import (ListCreateAPIView,

                                     RetrieveUpdateDestroyAPIView
                                     )
from rest_framework.parsers import MultiPartParser, FormParser
from Utils import (form_data_to_object, MainRenderer,
                   )
from .models import Job, Responsibility, Requirement
from .serializers import (JobSerializer,
                          ResponsibilitySerializer, RequirementSerializer)


class JobListCreateAPIView(ListCreateAPIView):
    serializer_class = JobSerializer
    renderer_classes = (MainRenderer,)
    parser_classes = [MultiPartParser, FormParser]
    queryset = Job.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=form_data_to_object(request.data))
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return super().post(request, *args, **kwargs)


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
