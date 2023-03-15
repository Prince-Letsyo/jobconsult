from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (AdminPermissionDetailAPIView,
                    AdminPermissionListCreateAPIView, AdminTypeDetailAPIView,
                    AdminTypeListCreateAPIView, AdminUserDetailAPIView,
                    AdminUserListCreateAPIView, CompanyInfoDetailAPIView,
                    CompanyInfoListCreateAPIView, CompanyRepDetailAPIView,
                    CompanyRepListCreateAPIView, LoginApiView, LogoutAPIView,
                    PasswordTokenCheckAPI, RegisterView,
                    RequestPasswordResestEmail, SeekerDetailAPIView,
                    SeekerListCreateAPIView, SetNewPasswordAPIView,
                    StaffDetailAPIView, StaffListCreateAPIView,
                    UserDetailAPIView, UserListCreateAPIView, VerifyEmailView)

urlpatterns = [
    path('', UserListCreateAPIView.as_view(), name='users'),
    path('<int:id>', UserDetailAPIView.as_view(), name='user-detail'),
    path('admin-types',
         AdminTypeListCreateAPIView.as_view(), name='admin-type'),
    path('admin-types/<int:id>',
         AdminTypeDetailAPIView.as_view(), name='admin-type-detail'),
    path('admin-permissions',
         AdminPermissionListCreateAPIView.as_view(), name='admin-permissions'),
    path('admin-permissions/<int:id>',
         AdminPermissionDetailAPIView.as_view(), name='admin-permission-detail'),
    path('admin-users',
         AdminUserListCreateAPIView.as_view(), name='admin-users'),
    path('admin-users/<int:id>',
         AdminUserDetailAPIView.as_view(), name='admin-user-detail'),
    path('staff-users',
         StaffListCreateAPIView.as_view(), name='staff-users'),
    path('staff-users/<int:id>',
         StaffDetailAPIView.as_view(), name='staff-user-detail'),
    path('job-seekers',
         SeekerListCreateAPIView.as_view(), name='seekers'),
    path('job-seekers/<int:id>',
         SeekerDetailAPIView.as_view(), name='seeker-detail'),
    path('company-reps',
         CompanyRepListCreateAPIView.as_view(), name='company-rep'),
    path('company-reps/<int:id>',
         CompanyRepDetailAPIView.as_view(), name='company-rep-detail'),
    path('company-info',
         CompanyInfoListCreateAPIView.as_view(), name='company-info'),
    path('company-info/<int:id>',
         CompanyInfoDetailAPIView.as_view(), name='company-info-detail'),
path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginApiView.as_view(), name="login"),
    path('logout/', LogoutAPIView.as_view(), name="logout"),
    path('verify-email/', VerifyEmailView.as_view(), name="verify-email"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token-refresh"),
    path('request-password-reset/', RequestPasswordResestEmail.as_view(),
         name='request-password-reset'),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete')
]
