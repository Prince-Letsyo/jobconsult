from django.db.models import TextChoices
from django.utils.translation import gettext_lazy as _
import json
from .unifunc import binary_search_group


class SectorChoices(TextChoices):
    SELECT = "", _("---------select---------")
    ADVERTISING_MEDIA_COMMUNICATION = "advertising-media-communications", _(
        "Advertising, Media & Communications")
    AGRICULTURE_FISHING_FORESTRY = "agriculture-fishing-forestry", _(
        "Agriculture, Fishing & Forestry")
    AUTOMOTIVE_AVIATION = "automotive-aviation", _("Automotive & Aviation")
    BANKING_FINANCE_INSURANCE = "banking-finance-insurance", _(
        "Banking, Finance & Insurance")
    CONSTRUCTION = "construction", _("Construction")
    EDUCATION = "education", _("Education")
    ENERGY_UTILITIES = "energy-utilities", _("Energy & Utilities")
    ENFORCEMENT_SECURITY = "enforcement-security", _(
        "Enforcement & Security")
    ENTERTAINMENT_EVENTS_SPORT = "entertainment-events-sport", _(
        "Entertainment, Events & Sport")
    GOVERNMENT = "government", _("Government")
    HEALTHCARE = "healthcare", _("Healthcare")
    HOSPITALITY_HOTEL = "hospitality-hotel", _("Hospitality & Hotel")
    IT_TELECOMS = "it-telecoms", _("IT & Telecoms")
    LAW_COMPLIANCE = "law-compliance", _("Law & Compliance")
    MANUFACTURING_WAREHOUSING = "manufacturing-warehousing", _(
        "Manufacturing & Warehousing")
    MINING_ENERGY_METALS = "mining-energy-metals", _(
        "Mining, Energy & Metals")
    NGO_NPO_CHARITY = "ngo-npo-charity", _("NGO, NPO & Charity")
    REAL_ESTATE = "real-estate", _("Real Estate")
    RECRUITMENT = "recruitment", _("Recruitment")
    RETAIL_FASHION_FMCG = "retail-fashion-fmcg", _(
        "Retail, Fashion & FMCG")
    SHIPPING_LOGISTICS = "shipping-logistics", _("Shipping & Logistics")
    TOURISM_TRAVEL = "tourism-travel", _("Tourism & Travel")


class JobType(TextChoices):
    SELECT = "", _("---------select---------")
    ACCOUNTING_AUDITING_FINANCE = "accounting-auditing-finance", _(
        "Accounting, Auditing & Finance")
    ADMIN_OFFICE = "admin-office", _("Admin & Office")
    BUILDING_ARCHITECTURE = "building-architecture", _(
        "Building & Architecture")
    COMMUNITY_SOCIAL_SERVICES = "community-social-services", _(
        "Community & Social Services")
    CONSULTING_STRATEGY = "consulting-strategy", _("Consulting & Strategy")
    CREATIVE_DESIGN = "creative-design", _("Creative & Design")
    CUSTOMER_SERVICE_SUPPORT = "customer-service-support", _(
        "Customer Service & Support")
    DRIVER_TRANSPORT_SERVICES = "driver-transport-services", _(
        "Driver & Transport Services")
    ENGINEERING_TECHNOLOGY = "engineering-technology", _(
        "Engineering & Technology")
    ESTATE_AGENT_PROPERTY_MANAGEMENT = "estate-agent-property-management", _(
        "Estate Agents & Property Management")
    FARMING_AGRICULTURE = "farming-agriculture", _("Farming & Agriculture")
    FOOD_SERVICES_CATERING = "food-services-catering", _(
        "Food Services & Catering")
    HEALTH_SAFETY = "health-safety", _("Health & Safety")
    HOSPITALITY_LEISURE = "hospitality-leisure", _("Hospitality & Leisure")
    HUMAN_RESOURCES = "human-resources", _("Human Resources")
    LEGAL_SERVICES = "legal-services", _("Legal Services")
    MANAGEMENT_BUSINESS_DEVELOPMENT = "management-business-development", _(
        "Management & Business Development")
    MARKETING_COMMUNICATION = "marketing-communications", _(
        "Marketing & Communications")
    MEDICAL_PHARMACEUTICAL = "medical-pharmaceutical", _(
        "Medical & Pharmaceutical")
    PRODUCT_PROJECT_MANAGEMENT = "product-project-management", _(
        "Product & Project Management")
    QUALITY_CONTROL_ASSURANCE = "quality-control-assurance", _(
        "Quality Control & Assurance")
    RESEARCH_TEACHING_TRAINING = "research-teaching-training", _(
        "Research, Teaching & Training")
    SALES = "sales", _("Sales")
    SOFTWARE_DATA = "software-data", _("Software & Data")
    SUPPLY_CHAIN_PROCUREMENT = "supply-chain-procurement", _(
        "Supply Chain & Procurement")
    TRADES_SERVICES = "trades-services", _("Trades & Services")


class MinimumQualification(TextChoices):
    SELECT = "", _("---------select---------")
    DEGREE = "degree", _("Degree")
    DIPLOMA = "diploma", _("Diploma")
    HIGHSCHOOL = "wassce-ssce", _("WASSCE / SSCE")
    HND = "hnd", _("HND")
    MBA_MSC = "mba-msc", _("MBA / MSc")
    MBBS = "mbbs", _("MBBS")
    MPHIL_PhD = "mphil-phd", _("MPhil / PhD")
    NCE = "nce", _("NCE")
    OND = "ond", _("OND")
    OTHERS = "others", _("Others")
    VACATIONAL = "vocational", _("Vocational")


class EmploymentType(TextChoices):
    SELECT = "", _("---------select---------")
    FULLTIME = "full-time", _("Full-time")
    PARTTIME = "part-time", _("Part-time")
    FREELANCE = "freelance", _("Freelance")
    CONTRACT = "contract", _("Contract")
    INTERNSHIP = "Internship", _("Internship")
    APPRENTICESHIP = "apprenticeship", _("Apprenticeship")
    SEASONAL = "seasonal", _("Seasonal")


class Sex(TextChoices):
    MALE = "M", _("Male")
    FEMALE = "F", _("Female")


class UserType(TextChoices):
    STAFF = "staff", _("Staff")
    SEEKER = "seeker", _("Seeker")
    COMPANYREP = "company-rep", _("Company Rep")


class PublisherType(TextChoices):
    COMPANYREP = "C", _("Company Representative")
    STAFF = "S", _("Staff")


class EmployeesNumber(TextChoices):
    SELECT = "", _("---------select---------")
    ONE = "1", _("1-4")
    TWO = "2", _("5-10")
    THREE = "3", _("11-25")
    FOUR = "4", _("26-50")
    FIVE = "5", _("51-100")
    SIX = "6", _("101-200")
    SEVEN = "7", _("201-500")
    EIGHT = "8", _("501-1000")
    NINE = "9", _("1001+")


class EmployerType(TextChoices):
    SELECT = "", _("---------select---------")
    DIRECT = "direct-employer", _("Direct Employer")
    RECRUIT = "recruitment-agency", _("Recruitment Agency")


class Position(TextChoices):
    SELECT = "", _("---------select----------")
    CLEVEL = "c-level", _("C-level: CEO / COO / CIO / CFO / CTO / CPO")
    SENIORMANAGEMENT = "senior-managements", _(
        "Senior Management: Head of Department / Team Lead")
    MIDDLEMANAGEMENT = "middle-managements", _(
        "Middle Management: Supervisor / Unit Head")
    JUNIORMANAGEMENT = "junior-managements", _(
        "Junior Level: Associate / Officer")


class Website(TextChoices):
    SELECT = "", _("---------select---------")
    ONLINESEARCH = "online-search", _("Online Search")
    ONLINEADVERTS = "online-adverts", _("Online Adverts")
    ONLINEARTICLES = "online-articles", _("Online Articles")
    SOCIALMEDIA = "social-media", _("Social Media (Linkedin,Twitter etc)")
    EMAILMARKETING = "email-marketing", _("Email Marketing")
    BILLBOARDS = "billboards", _("Billboards")
    RADIO = "radio", _("Radio")
    TV = "tv", _("Tv")
    NEWSPAPER = "newspaper", _("Newspaper")
    MAGAZINES = "magazines", _("Magazines")
    DIRECTMAIL = "direct-mail", _("Direct Mail")
    REFERRAL = "referral", _("Referral")
    EVENT = "event", _("Event")
    OTHER = "other", _("OTHER")


class Admin_Type(TextChoices):
    SUPERADMIN = "super-admin", _("Super")
    APPROVALADMIN = "approval-admin", _("Approval")
    CATEGORYADMIN = "category-admin", _("Category")
    STAFF = "staff", _("Staff")


class PermissionChoice(TextChoices):
    ADD = "add", _("Add")
    CHANGE = "change", _("Change")
    DELETE = "delete", _("Delete")
    VIEW = "view", _("View")


class NationalityChoices(TextChoices):
    SELECT = "", _("---------select---------")


class CityChoices(TextChoices):
    SELECT = "", _("---------select a country---------")


def read_data_from_file(file, filter_by):
    data = []
    try:
        with open(file, "r", encoding="utf-8")as file:
            json_data = json.load(file)
            if filter_by is not None:
                data = binary_search_group(json_data, filter_by)
            else:
                data = json_data
    except Exception as e:
        print(e)
    return data


def make_choices_data(file, key, value, filter_by=None):
    choices_data = [("---------select---------", "")]

    for x in [(item[value], _(item[key]))
              for item in read_data_from_file(file=file, filter_by=filter_by)]:
        choices_data.append(x)
    return choices_data


nationality_choices = TextChoices(
    "NationalityChoices", make_choices_data(file="./countries.json", key="alpha_2_code", value="nationality", filter_by=None))
