from django.contrib import admin
from django.urls import path, include, re_path
from posts import views
from posts.urls import router as post_router
from django.conf import settings
from django.conf.urls.static import static

from django.views.generic import TemplateView
from posts.views import FrontendRenderView, FrontendAppView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    #path('', views.home, name='home'),
    path('api/', include(post_router.urls)),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/', include('rest_auth.urls'))
    #re_path(r'^', FrontendAppView.as_view(), name='home')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [
    #re_path(r'^', FrontendAppView.as_view(), name='home')
    re_path(r'(?P<path>.*)', TemplateView.as_view(template_name='index.html'), name='home')
]


