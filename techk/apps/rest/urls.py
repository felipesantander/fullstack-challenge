# -*- coding: utf-8 -*-
from django.urls import include, path
from rest_framework import routers
import apps.rest.views as views

app_name = "rest"

router = routers.DefaultRouter()
router.register(r'libros', views.libros_view_set)
router.register(r'categorias', views.Categorias_view_set)

urlpatterns = [
    path('', include(router.urls)),
    #   path('fallback', views.fallbackJson),
    path('libros/categoria/<categoria>', views.libros_de_categoria.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]