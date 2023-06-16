from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView)
from Utils.permissions import IsSeeker
from user.models import (Seeker)
from ..serializers import (SeekerSerializer)

from rest_framework import serializers
from drf_yasg import openapi
from drf_yasg import openapi
from rest_framework import serializers
from drf_yasg import openapi
from drf_yasg.inspectors import SwaggerAutoSchema


class SeekerAutoSchema(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operations = super().get_operation(operation_keys)

        serializer = self.view.get_serializer()
        fields = serializer.get_fields()



        operations["requestBody"] = {
            "required": True,
            "content": {
                "application/json": {
                    "schema": fields
                }
            }
        }

        return operations

class SeekerListCreateAPIView(ListCreateAPIView):
    serializer_class = SeekerSerializer
    queryset = Seeker.objects.all()

    @swagger_auto_schema(request_body=SeekerSerializer, auto_schema=SeekerAutoSchema)
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class SeekerDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = SeekerSerializer
    permission_classes = [IsSeeker,]
    queryset = Seeker.objects.all()
    lookup_field = 'user'
