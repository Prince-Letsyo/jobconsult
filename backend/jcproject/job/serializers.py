from rest_framework import serializers
from rest_framework.utils import model_meta
from .models import Job, Responsibility, Requirement
from user.serializers import UserField, User, CompanyInfo, RepresentativeField


class ResponsibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsibility
        fields = [
            'id',
            'job',
            'assign',
        ]


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = [
            'id',
            'job',
            'requires',
        ]


class CompanyNameField(serializers.RelatedField):
    def to_internal_value(self, data):
        try:
            return self.get_queryset().objects.filter(representative=int(data)).first()
        except CompanyInfo.DoesNotExist:
            raise serializers.ValidationError(
                {"company": "Company does not exist."}, 404)

    def to_representation(self, value):
        company = CompanyInfo.objects.get(company_name=value)
        imageUrl = None
        if company.image and hasattr(company.image, "url"):
            request = self.context.get("request")
            imageUrl = request.build_absolute_uri(company.image.url)
        return {
            "representative": RepresentativeField(read_only=True).to_representation(company.representative),
            "company_name": company.company_name,
            "industry": company.industry,
            "number_of_employees": company.number_of_employees,
            "type_of_employer": company.type_of_employer,
            "hear_about": company.hear_about,
            "website": company.website,
            "contact_person": company.contact_person,
            "company_email": company.company_email,
            "company_phone_number": str(company.company_phone_number),
            "country": company.country,
            "address": company.address,
            "image": "" if imageUrl is None else imageUrl
        }


class JobSerializer(serializers.ModelSerializer):
    responsibilities = ResponsibilitySerializer(many=True, required=False)
    requirements = RequirementSerializer(many=True, required=False)
    publisher = UserField(queryset=User)
    company_name = CompanyNameField(queryset=CompanyInfo)

    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'location',
            'description',
            'company_name',
            'image',
            'sector',
            'type_of_job',
            'deadline',
            'minimum_qualification',
            'type_of_employment',
            'experience_length',
            'responsibilities',
            'requirements',
            'number_of_required_applicantion',
            'slug',
            'type_of_publisher',
            'publisher',
        ]

    def create(self, validated_data):
        validated_data.pop("responsibilities")
        validated_data.pop("requirements")

        validated_data["company_name"] = CompanyInfo.objects.get(
            representative=validated_data["company_name"])
        instance = Job.objects.create(**validated_data)

        instance.responsibilities.set(
            Responsibility.objects.filter(job=instance))
        instance.requirements.set(Requirement.objects.filter(job=instance))

        instance.save()
        return instance

    def createM2M_fields(self, model, data, key):
        multiObj = []
        for obj in data[key]:
            res = model.objects.create(**obj)
            res.save()
            multiObj.append(res)
        return multiObj

    def update(self, instance, validated_data):
        info = model_meta.get_field_info(instance)

        validated_data['responsibilities'] = self.createM2M_fields(
            Responsibility, validated_data, "responsibilities")

        validated_data['requirements'] = self.createM2M_fields(
            Requirement, validated_data, "requirements")

        m2m_fields = []
        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                m2m_fields.append((attr, value))
            else:
                setattr(instance, attr, value)

        instance.save()

        for attr, value in m2m_fields:
            field = getattr(instance, attr)
            field.set(value)

        return instance
