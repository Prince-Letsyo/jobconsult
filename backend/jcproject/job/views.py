from django.db.models.query import QuerySet
from rest_framework.generics import (DestroyAPIView, ListAPIView,
                                     ListCreateAPIView, RetrieveUpdateDestroyAPIView)
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from Utils import (form_data_to_object, IsJobOwner, IsVerified)
from Utils.serializers_fields import (JobSerializer, ResponsibilitySerializer,
                                      RequirementSerializer)
from .models import (Responsibility, Requirement,
                     JobApproval, JobApproval, Job)
from .serializers import (JobSerializer, JobApprovalSerializer)


class JobListCreateAPIView(ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsVerified]
    parser_classes = [MultiPartParser, FormParser]
    queryset = Job.objects.all()

    def post(self, request, *args, **kwargs):
        data = form_data_to_object(request.data)
        job = Job.objects.filter(
            title=data["title"],
            publisher_id=data['publisher']['id']
        )
        if job.exists():
            return Response({"job": "Job already exist"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class JobDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsJobOwner]
    parser_classes = [MultiPartParser, FormParser]
    queryset = Job.objects.all()
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        data = form_data_to_object(request.data)
        instance = self.get_object()
        serializer = self.serializer_class(
            instance=instance, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"updated": True}, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        data = form_data_to_object(request.data)
        instance = self.get_object()
        serializer = self.serializer_class(
            instance=instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"patched": True}, status=status.HTTP_200_OK)


class JobApprovalListView(ListAPIView):
    serializer_class = JobApprovalSerializer
    queryset = JobApproval.objects.all()
    lookup_field = 'id'

    def get_queryset(self):
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )
        queryset = self.queryset
        if isinstance(queryset, QuerySet):
            queryset = queryset.filter(is_publish=True)
        return queryset


class ResponsibilityDestroyAPIView(DestroyAPIView):
    serializer_class = ResponsibilitySerializer
    queryset = Responsibility.objects.all()
    lookup_field = 'id'


class RequirementDestroyAPIView(DestroyAPIView):
    serializer_class = RequirementSerializer
    queryset = Requirement.objects.all()
    lookup_field = 'id'
