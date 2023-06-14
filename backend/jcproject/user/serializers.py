import os
from django.contrib import auth
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django_countries.serializer_fields import CountryField
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from rest_framework.serializers import Serializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.utils import model_meta
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .models import (CompanyInfo,
                     CompanyRep, Seeker, Staff, User, Sector, )
from job.models import Job


class JobSectorField(serializers.RelatedField):
    def to_internal_value(self, data):
        sector_text = data["sector"]
        seeker = data["seeker"]
        if seeker:
            sector, exist = self.get_queryset().objects.get_or_create(
                sector=sector_text, seeker=Seeker.objects.get(user=seeker))
            return sector
        else:
            data.pop("seeker")
            return data

    def to_representation(self, value):
        return {
            "id": value.id,
            "sector": value.sector,
            "seeker": value.seeker.user.id,
        }


class UserField(serializers.RelatedField):
    def to_internal_value(self, data):
        try:
            user = self.get_queryset().objects.filter(id=data.get("id")).first()
            data.pop("id", "")
            if len(data) != 0:
                for key, value in data.items():
                    setattr(user, key, value)
                user.save()
            return user
        except User.DoesNotExist:
            raise serializers.ValidationError(
                {"userr": "User does not exist."}, 404)

    def to_representation(self, value):
        return {
            "id": value.id,
            "first_name": value.first_name,
            "last_name": value.last_name,
            "middle_name": value.middle_name,
            "gender": value.gender,
            "email": value.email,
            "user_type": value.user_type,
            "phone_number": str(value.phone_number),
        }


class JobField(serializers.RelatedField):
    def to_internal_value(self, data):
        publisher = data.pop("publisher")
        id = data.pop("id")
        if publisher and id:
            job, exist = self.get_queryset().objects.get_or_create(
                id=id, publisher=publisher, **data
            )
            return job
        else:
            return data

    def to_representation(self, value):
        return {
            'id': value.id,
            'title': value.title,
            "country": value.country,
            "city": value.city,
            'description': value.description,
            'image': value.image,
            'sector': value.sector,
            'type_of_job': value.type_of_job,
            'deadline': value.deadline,
            'minimum_qualification': value.minimum_qualification,
            'type_of_employment': value.type_of_employment,
            'experience_length': value.experience,
            'responsibilities': value.responsibilities,
            'requirements': value.requirements,
            'number_of_required_applicantion': value.number_of_required_applicantion,
            'publisher': value.publisher,
        }


class RepresentativeField(serializers.RelatedField):
    def to_internal_value(self, data):
        try:
            return self.get_queryset().objects.filter(user_id=int(data)).first()
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist.")

    def to_representation(self, value):
        user = User.objects.get(id=value.user.id)
        return {
            "user": UserField(read_only=True).to_representation(user),
            "position": value.position
        }


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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'gender',
            'user_type',
            'email',
            'phone_number',
        ]


class StaffSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Staff
        fields = [
            'user',
            'position',
            'supervisor',
        ]


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = [
            "id",
            'seeker',
            'sector',
        ]


class SeekerSerializer(serializers.ModelSerializer):
    user = UserField(queryset=User)
    job_sector = JobSectorField(queryset=Sector, many=True)

    class Meta:
        model = Seeker
        fields = [
            'user',
            'date_of_birth',
            'nationality',
            'city',
            'high_qualification',
            'years_of_experience',
            'available',
            'job_sector',
        ]

    def create(self, validated_data):
        seeker_sectors = validated_data.pop("job_sector")

        instance = self.Meta.model.objects.create(**validated_data)

        for sector in seeker_sectors:
            Sector.objects.get_or_create(
                seeker=instance, sector=sector["sector"])

        instance.job_sector.set(
            Sector.objects.filter(seeker=instance))

        instance.save()
        return instance


class CompanyRepSerializer(serializers.ModelSerializer):
    user = UserField(queryset=User)
    jobs = JobField(queryset=Job, many=True)

    class Meta:
        model = CompanyRep
        fields = [
            'user',
            'position',
            "jobs"
        ]

    def create(self, validated_data):
        jobs = validated_data.pop("jobs")

        instance = CompanyRep.objects.get(**validated_data)

        for job in jobs:
            publisher = job.pop("publisher")
            Job.objects.get_or_create(publisher=publisher, **job)

        instance.jobs.set(Job.objects.filter(publisher=instance.publisher))
        
        instance.save()
        return instance


class CompanyInfoSerializer(serializers.ModelSerializer):
    representative = RepresentativeField(queryset=CompanyRep)
    image = serializers.ImageField()
    country = CountryField()

    class Meta:
        model = CompanyInfo
        fields = [
            'representative',
            'company_name',
            'industry',
            'number_of_employees',
            'type_of_employer',
            'hear_about',
            'website',
            'contact_person',
            'company_email',
            'company_phone_number',
            'country',
            'city',
            'address',
            'image',
        ]

    def update(self, instance, validated_data):
        if instance.image and hasattr(instance.image, "name") and validated_data["image"]:
            if instance.image.name.split("/")[-1] == validated_data["image"].name:
                validated_data.pop("image")
            else:
                file_path = instance.image.path
                if os.path.isfile(file_path):
                    os.remove(file_path)
        return super().update(instance, validated_data)
