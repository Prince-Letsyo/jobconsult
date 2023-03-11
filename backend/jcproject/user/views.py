from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView)

from .models import (AdminPermission, AdminType, AdminUser, CompanyInfo,
                     CompanyRep, Seeker, Staff, User)
from .serializers import (AdminPermissionSerializer, AdminTypeSerializer,
                          AdminUserSerializer, CompanyInfoSerializer,
                          CompanyRepSerializer, SeekerSerializer,
                          StaffSerializer, UserSerializer)
from Utils import UserRenderer

class UserListCreateAPIView(ListCreateAPIView):
    serializer_class = UserSerializer
    renderer_classes=(UserRenderer,)
    queryset = User.objects.all()


class UserDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'


class AdminTypeListCreateAPIView(ListCreateAPIView):
    serializer_class = AdminTypeSerializer
    queryset = AdminType.objects.all()


class AdminTypeDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = AdminTypeSerializer
    queryset = AdminType.objects.all()
    lookup_field = 'id'


class AdminPermissionListCreateAPIView(ListCreateAPIView):
    serializer_class = AdminPermissionSerializer
    queryset = AdminPermission.objects.all()


class AdminPermissionDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = AdminPermissionSerializer
    queryset = AdminPermission.objects.all()
    lookup_field = 'id'


class AdminUserListCreateAPIView(ListCreateAPIView):
    serializer_class = AdminUserSerializer
    queryset = AdminUser.objects.all()


class AdminUserDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = AdminUserSerializer
    queryset = AdminUser.objects.all()
    lookup_field = 'id'


class StaffListCreateAPIView(ListCreateAPIView):
    serializer_class = StaffSerializer
    queryset = Staff.objects.all()


class StaffDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = StaffSerializer
    queryset = Staff.objects.all()
    lookup_field = 'id'


class SeekerListCreateAPIView(ListCreateAPIView):
    serializer_class = SeekerSerializer
    queryset = Seeker.objects.all()


class SeekerDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = SeekerSerializer
    queryset = Seeker.objects.all()
    lookup_field = 'id'


class CompanyRepListCreateAPIView(ListCreateAPIView):
    serializer_class = CompanyRepSerializer
    queryset = CompanyRep.objects.all()


class CompanyRepDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyRepSerializer
    queryset = CompanyRep.objects.all()
    lookup_field = 'id'


class CompanyInfoListCreateAPIView(ListCreateAPIView):
    serializer_class = CompanyInfoSerializer
    queryset = CompanyInfo.objects.all()


class CompanyInfoDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyInfoSerializer
    queryset = CompanyInfo.objects.all()
    lookup_field = 'id'
