from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import (ListCreateAPIView, RetrieveUpdateDestroyAPIView)
from rest_framework.response import Response
from Utils import (IsVerified, form_data_to_object,
                   IsCompanyRep, IsCompanyInfoRep, )

from user.models import (CompanyInfo, CompanyRep)
from ..serializers import (CompanyInfoSerializer, CompanyRepSerializer)


class CompanyRepListCreateAPIView(ListCreateAPIView):
    serializer_class = CompanyRepSerializer
    parser_classes = [MultiPartParser, FormParser]
    queryset = CompanyRep.objects.all()
    
    def post(self, request, *args, **kwargs):
        data = form_data_to_object(request.data)
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"created": True},
            status=status.HTTP_200_OK
        )

class CompanyRepDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyRepSerializer
    permission_classes = [IsCompanyRep]
    parser_classes = [MultiPartParser, FormParser]
    queryset = CompanyRep.objects.all()
    lookup_field = 'user'

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


class CompanyInfoListCreateAPIView(ListCreateAPIView):
    serializer_class = CompanyInfoSerializer
    permission_classes = [IsVerified]
    parser_classes = [MultiPartParser, FormParser]
    queryset = CompanyInfo.objects.all()


class CompanyInfoDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyInfoSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsCompanyInfoRep]
    queryset = CompanyInfo.objects.all()
    lookup_field = 'representative'
