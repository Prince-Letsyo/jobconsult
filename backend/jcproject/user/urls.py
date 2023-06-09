from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (CompanyInfoDetailAPIView, CompanyInfoListCreateAPIView,
                    CompanyRepDetailAPIView, CompanyRepListCreateAPIView,
                    LoginApiView, LogoutAPIView, PasswordTokenCheckAPI,
                    RegisterView, RequestPasswordResestEmail,
                    SectorDestroyAPIView, SeekerDetailAPIView, SeekerListCreateAPIView,
                    SetNewPasswordAPIView,VerifyEmailView,UserRetrieveAPIView)

urlpatterns = [
     path('<int:id>/', UserRetrieveAPIView.as_view(), name='user-detail'),
    path('job-seekers/',
         SeekerListCreateAPIView.as_view(), name='seekers'),
    path('job-seekers/<int:user>/',
         SeekerDetailAPIView.as_view(), name='seeker-detail'),
    path('sectors/<int:id>/',
         SectorDestroyAPIView.as_view(), name='sector-detail'),
    path('company-reps/',
         CompanyRepListCreateAPIView.as_view(), name='company-rep'),
    path('company-reps/<int:user>/',
         CompanyRepDetailAPIView.as_view(), name='company-rep-detail'),
    path('company-info/',
         CompanyInfoListCreateAPIView.as_view(), name='company-info'),
    path('company-info/<int:representative>/',
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
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete'),
]
