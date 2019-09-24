"""techk URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
#from apps.base.views import index
from apps.base.views import UserViewSet
from rest_framework import routers
from django.views import generic
from apps.scraper.views import tejer_categorias,tejer_libros_categoria
router = routers.DefaultRouter()

router.register(r'users', UserViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'view/', generic.TemplateView.as_view(template_name='view1.html')),
    path(r'tejedor/categorias', tejer_categorias),
    path(r'tejedor/categorias/url="<str:url_categoria>"', tejer_libros_categoria),
    path(r'rest/', include('apps.rest.urls')),
    url(r'^api-auth/', include('rest_framework.urls')),
]