from django.shortcuts import render
from rest_framework import serializers, viewsets, generics
from apps.scraper.models import Libros, Categorias
from django.http import JsonResponse
# Create your views here.


class libros_serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Libros
        fields = ['id', 'categoria_id', 'titulo', 'miniatura_url', 'precio',
                  'cantidad', 'libro_descripcion', 'upc']

class categorias_serializer(serializers.HyperlinkedModelSerializer):
    libros = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Categorias
        fields = ['id', 'nombre_categoria','url','libros']


class libros_view_set(viewsets.ModelViewSet):
    queryset = Libros.objects.all()
    serializer_class = libros_serializer


class libros_de_categoria(generics.ListAPIView):
    serializer_class = libros_serializer
    def get_queryset(self):
        id_categoria = self.kwargs['categoria']
        return Libros.objects.filter(categoria=id_categoria)

class Categorias_view_set(viewsets.ModelViewSet):
    queryset            = Categorias.objects.all()
    serializer_class    = categorias_serializer

