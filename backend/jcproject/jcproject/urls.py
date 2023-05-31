from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenRefreshView

schema_view = get_schema_view(
    openapi.Info(
        title="Job consult",   
        default_version="v1",
        description="Job recuitment services",
        terms_of_service="",
        contact=openapi.Contact(email="prrinceletsyo1596.com"),
        license=openapi.License(name='BSD license')
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', schema_view.with_ui("swagger",
         cache_timeout=0), name="schema-swagger-ui"),
    path('api/v1/jobs/', include("job.urls"),),
    path('api/v1/applications/', include("application.urls"),),
    path('api/v1/users/', include("user.urls"),),
    path('api/v1/choices/', include("choices.urls"),),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
