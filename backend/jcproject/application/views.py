from rest_framework.generics import (ListAPIView, ListCreateAPIView,
                                     CreateAPIView,RetrieveAPIView
                                     )
from django.db.models.query import QuerySet
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Application, JobApplication, ApplicantDoc
from .serializers import JobApplicationSerializer, ApplicantDocSerializer, ApplicationSerializer
from Utils import MainRenderer,IsVerified


class JobApplicationListCreateAPIView(ListCreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsVerified]
    renderer_classes = (MainRenderer,)
    queryset = JobApplication.objects.all()


class ApplicantDocCreateAPIView(CreateAPIView):
    serializer_class = ApplicantDocSerializer
    permission_classes = [IsVerified]
    parser_classes = [MultiPartParser, FormParser]
    renderer_classes = (MainRenderer,)
    queryset = ApplicantDoc.objects.all()


class ApplicationRetrieveAPIView(RetrieveAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsVerified]
    queryset = Application.objects.all()
    lookup_field = 'id'
    
class ApplicationListView(ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsVerified]
    queryset = Application.objects.all()
    lookup_field = 'id'

    def get_queryset(self):
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )
        queryset = self.queryset
        if isinstance(queryset, QuerySet):
            queryset = queryset.filter(
                job_publisher_user_id=self.request.user.id)
        return queryset
