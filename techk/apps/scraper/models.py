# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Categorias(models.Model):
    nombre_categoria = models.CharField(max_length=254)
    url              = models.CharField(max_length=254)


class Libros(models.Model):
    categoria               = models.ForeignKey(Categorias, related_name="libros", on_delete=models.CASCADE)
    titulo                  = models.CharField(max_length=2048)
    miniatura_url           = models.CharField(max_length=2048)
    precio                  = models.FloatField()
    cantidad                = models.CharField(max_length=2048)
    libro_descripcion       = models.TextField(default=None, blank=True, null=True)
    upc                     = models.CharField(max_length=32)