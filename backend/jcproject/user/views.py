import jwt
import json
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.encoding import (DjangoUnicodeDecodeError, smart_bytes,
                                   smart_str)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from jwt import ExpiredSignatureError
from jwt.exceptions import DecodeError
from rest_framework import permissions, status, views
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import (ListCreateAPIView, ListAPIView,
                                     RetrieveUpdateDestroyAPIView, GenericAPIView)
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from Utils import (CustomRedirect, IsVerified, MailSender, MainRenderer,
                   is_valid_url, IsSectorOwner, IsCompanyRep, Position, Sex, MinimumQualification, SectorChoices)

from .models import (AdminPermission, AdminType, AdminUser, CompanyInfo, Sector,
                     CompanyRep, Seeker, Staff, User)
from .serializers import (CompanyInfoSerializer, SectorSerializer,
                          CompanyRepSerializer, EmailVerificationSerializer,
                          LoginSerializer, LogoutSerializer,
                          PasswordTokenSerializer, RegisterSerializer,
                          ResetPasswordEmailRequestSerializer,
                          SeekerSerializer, SetNewPasswordSerializer,
                          StaffSerializer, UserSerializer, ChoicesDisplayField)


class RegisterView(GenericAPIView):
    serializer_class = RegisterSerializer
    renderer_classes = (MainRenderer,)

    def post(self, request):
        data = {
            "email": request.data.pop("email"),
            "password": request.data.pop("password"),
            "first_name": request.data.pop("first_name"),
            "last_name": request.data.pop("last_name"),
        }
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        redirect_url = request.data.pop('redirect_url', '')
        user = User.objects.get(email=user_data['email'])
        for key, value in request.data.items():
            setattr(user, key, value)
        user.save()
        token = user.tokens['access']

        redirect_ = ''
        if is_valid_url(redirect_url):
            redirect_ = f'&redirect_url={redirect_url}'
        current_site = get_current_site(request).domain
        relativelink = reverse('verify-email')

        absolute_url = f'http://{current_site}{relativelink}?token={token}'
        email_body = f'Hi {user.first_name}, use the link below to verify your email. This link will expire in next five minutes.\n {absolute_url}{redirect_}'
        message = {
            'email_body': email_body,
            'email_to': user.email,
            'email_subject': 'Verify your email'
        }

        MailSender.send_mail(message)

        return Response({'success': True,
                         'user_id': user.id,
                         'user_type': user.user_type,
                         },
                        status=status.HTTP_201_CREATED)


class VerifyEmailView(views.APIView):
    serializer_class = EmailVerificationSerializer
    renderer_classes = (MainRenderer,)

    token_param_config = openapi.Parameter(name="token", in_=openapi.IN_QUERY,
                                           description="description", type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        redirect_url = request.GET.get('redirect_url', '')
        token = request.GET.get('token')
        current_site = f"http://{get_current_site(request).domain}{reverse('verify-email')}"
        valued = '?expired=true'
        try:
            payload = jwt.decode(
                jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            if user.is_verified:
                valued = f'?expired=false&token={token}'
                if is_valid_url(redirect_url):
                    return CustomRedirect(f'{redirect_url}{valued}')
                else:
                    return CustomRedirect(f'{current_site}{valued}')
            else:
                if is_valid_url(redirect_url):
                    return CustomRedirect(f'{redirect_url}{valued}')
                else:
                    return CustomRedirect(f'{current_site}{valued}')

        except jwt.ExpiredSignatureError as identifer:
            if is_valid_url(redirect_url):
                return CustomRedirect(f'{redirect_url}{valued}')
            else:
                return CustomRedirect(f'{current_site}{valued}')
        except DecodeError as identifer:
            if is_valid_url(redirect_url):
                return CustomRedirect(f'{redirect_url}{valued}')
            else:
                return CustomRedirect(f'{current_site}{valued}')

    token_param_config = openapi.Parameter(name="token", in_=openapi.IN_QUERY,
                                           description="description", type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def post(self, request):
        token = request.GET['token']
        try:
            payload = jwt.decode(
                jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            if user.is_verified:
                return Response({'expired': False, 'verified': True}, status=status.HTTP_200_OK)
            else:
                return Response({'expired': False, 'verified': False}, status=status.HTTP_200_OK)

        except ExpiredSignatureError as identifer:
            return Response({'expired': True}, status=status.HTTP_400_BAD_REQUEST)
        except DecodeError as identifer:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)


class LoginApiView(GenericAPIView):
    serializer_class = LoginSerializer
    renderer_classes = (MainRenderer,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({
            "success": True,
            'user_id': serializer.data["id"],
            'user_type': User.objects.get(id=serializer.data["id"]).user_type,
            'tokens': serializer.data["tokens"],
        }, status=status.HTTP_200_OK)


class RequestPasswordResestEmail(GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    renderer_classes = (MainRenderer,)

    def post(self, request):
        print(request)
        self.serializer_class(data=request.data)

        email = request.data['email']
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)

            current_site = get_current_site(request=request).domain
            relativelink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = request.data.get('redirect_url', '')
            redirect_ = ''
            if is_valid_url(redirect_url):
                redirect_ = f'?redirect_url={redirect_url}'
            absolute_url = f'http://{current_site}{relativelink}'

            email_body = f'Hello {user.first_name}, use the link below to reset your password\n{absolute_url}{redirect_}'
            message = {
                'email_body': email_body,
                'email_to': user.email,
                'email_subject': 'Reset your password'
            }
            MailSender.send_mail(message)

            return Response({'sucess': 'We have sent a link to reset your password.'},
                            status=status.HTTP_200_OK)
        else:
            return Response({'error': 'This email does not exist on our server, please try registering or provide a valid email'},
                            status=status.HTTP_404_NOT_FOUND)


class PasswordTokenCheckAPI(GenericAPIView):
    serializer_class = PasswordTokenSerializer
    renderer_classes = (MainRenderer,)

    def get(self, request, uidb64, token):
        redirect_url = request.GET.get('redirect_url', '')
        current_site = 'http://localhost:3000/reset-password/'
        valued = '?token_valid=False'
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                if redirect_url and len(redirect_url) > 3:
                    return CustomRedirect(f'{redirect_url}{valued}')
                else:
                    return CustomRedirect(f'{current_site}{valued}')
            else:
                valued = f'?token_valid=True&message=Credential_valid&uidb64={uidb64}&token={token}'
                if redirect_url and len(redirect_url) > 3:
                    return CustomRedirect(f'{redirect_url}{valued}')
                else:
                    return CustomRedirect(f'{current_site}{valued}')

        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)

    def post(self, request, uidb64, token):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response({"success": True, 'token': serializer.data['token'],
                         'uidb64': serializer.data['uidb64']},
                        status=status.HTTP_200_OK)


class SetNewPasswordAPIView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    renderer_classes = (MainRenderer,)

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset successfully.'},
                        status=status.HTTP_200_OK)


class LogoutAPIView(GenericAPIView):
    serializer_class = LogoutSerializer
    renderer_classes = (MainRenderer,)
    permission_classes = (IsVerified,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class UserListAPIView(ListAPIView):
    serializer_class = UserSerializer
    renderer_classes = (MainRenderer,)
    queryset = User.objects.all()


class UserDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    renderer_classes = (MainRenderer,)
    lookup_field = 'id'


class StaffListCreateAPIView(ListCreateAPIView):
    serializer_class = StaffSerializer
    renderer_classes = (MainRenderer,)
    queryset = Staff.objects.all()


class StaffDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = StaffSerializer
    renderer_classes = (MainRenderer,)
    queryset = Staff.objects.all()
    lookup_field = 'id'


class SeekerListCreateAPIView(ListCreateAPIView):
    serializer_class = SeekerSerializer
    renderer_classes = (MainRenderer,)
    queryset = Seeker.objects.all()


class SeekerDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = SeekerSerializer
    renderer_classes = (MainRenderer,)
    queryset = Seeker.objects.all()
    lookup_field = 'user'


class SectorListCreateAPIView(ListCreateAPIView):
    serializer_class = SectorSerializer
    renderer_classes = (MainRenderer,)
    queryset = Sector.objects.all()

    def get_queryset(self):
        seeker = self.request.user
        return Sector.objects.filter(seeker=seeker.id)


class SectorDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = SectorSerializer
    renderer_classes = (MainRenderer,)
    permission_classes = [IsSectorOwner,]
    queryset = Sector.objects.all()
    lookup_field = 'id'


class CompanyRepListCreateAPIView(ListCreateAPIView):
    serializer_class = CompanyRepSerializer
    renderer_classes = (MainRenderer,)
    queryset = CompanyRep.objects.all()


class CompanyRepDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyRepSerializer
    renderer_classes = (MainRenderer,)
    queryset = CompanyRep.objects.all()
    lookup_field = 'user'


class CompanyInfoListCreateAPIView(ListCreateAPIView):
    serializer_class = CompanyInfoSerializer
    renderer_classes = (MainRenderer,)
    parser_classes = [MultiPartParser, FormParser]
    queryset = CompanyInfo.objects.all()

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        return CompanyInfo.objects.filter(representative=user.id)


class CompanyInfoDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyInfoSerializer
    renderer_classes = (MainRenderer,)
    permission_classes = [IsCompanyRep,]
    queryset = CompanyInfo.objects.all()
    lookup_field = 'user'


class GenericChoiceAPIView(views.APIView):
    def get(self,  request, choice, *args, **kwargs):
        choices = None
        if choice == "position":
            choices = Position
        elif choice == "sex":
            choices = Sex
        elif choice == "qualication":
            choices = MinimumQualification
        elif choice == "sector":
            choices = SectorChoices
        else:
            return Response({"choice": "choice not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"data": ChoicesDisplayField().to_representation(choices)}, status=status.HTTP_200_OK)
