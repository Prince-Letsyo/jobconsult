from django.contrib import auth
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from rest_framework.serializers import Serializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from ..models import (User, )


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    redirect_url = serializers.CharField(
        max_length=500, min_length=0, required=False)

    class Meta:
        model = User
        fields = ['email',
                  'password',
                  'first_name',
                  'last_name',
                  'middle_name',
                  'gender',
                  'user_type',
                  'email',
                  'phone_number',
                  'redirect_url']

    def validate(self, attrs):
        email = attrs.get('email', '')
        first_name = attrs.get('first_name', '')
        last_name = attrs.get('last_name', '')

        if not first_name.isalnum():
            raise serializers.ValidationError(
                "The first_name should contain alphanumeric characters")
        if not last_name.isalnum():
            raise serializers.ValidationError(
                "The last_name should contain alphanumeric characters")
        return attrs

    def create(self, validated_data):
        validated = {'email': validated_data['email'],
                     'password': validated_data['password'],
                     'first_name': validated_data['first_name'],
                     'last_name': validated_data['last_name'],
                     }
        return User.objects.create_user(**validated_data)


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    tokens = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'tokens']

    def get_tokens(self, obj):
        user = User.objects.get(email=obj['email'])

        return {
            'access': user.tokens['access'],
            'refresh': user.tokens['refresh'],
        }

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')

        user = auth.authenticate(
            email=email, password=password)
        if not user:
            raise AuthenticationFailed("Invalid credentials, try agian.")
        if not user.is_active:
            raise AuthenticationFailed("Account disabled, contact admin.")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified.")

        return {
            'id': user.id,
            'email': user.email,
            'tokens': user.tokens,
        }


class ResetPasswordEmailRequestSerializer(Serializer):
    email = serializers.EmailField(min_length=2, required=True)
    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


class PasswordTokenSerializer(Serializer):
    token = serializers.CharField(min_length=1)
    uidb64 = serializers.CharField(min_length=1)

    class Meta:
        fields = ['token', 'uidb64']

    def validate(self, attrs):
        try:
            token = attrs.get('token', '')
            uidb64 = attrs.get('uidb64', '')
            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return attrs


class SetNewPasswordSerializer(Serializer):
    password = serializers.CharField(
        max_length=68, min_length=1, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password', '')
            token = attrs.get('token', '')
            uidb64 = attrs.get('uidb64', '')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()
            return user

        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)


class LogoutSerializer(Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token': ('Token is expired oo invalid.')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail("bad_token")


