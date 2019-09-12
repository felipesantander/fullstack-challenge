# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
import requests

from bs4 import BeautifulSoup
from datetime import timedelta, timezone, datetime
import os
from dataclasses import *
from typing import Any
from .models import Libros, Categorias


# Create your tests here.

@dataclass
class el_tejedor():
    url         :str    = '' 
    v_url       :bool   = False
    session     :Any   = False

    def __post_init__(self):
        if self.url=='':
            print("No url asignada")
        else:
            v_url      =      self.validad_url()
            if v_url == False:
                print ('Url No valida')    
            else:
                self.session = requests.Session()
                self.session.headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.109 Safari/537.36"}

    def validad_url(self):
        request = requests.get(self.url)
        if request.status_code == 200:
            return True
        else:
            return False 

    def tratar_get(self, url):
        try :
            return self.session.get(self.url+url, verify=False).content
        except:
            self.session = requests.Session()
            self.session.headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.109 Safari/537.36"}
            return self.tratar_get(url)


    def tejer(self):
        for c in self.traer_categorias():
            nombre_categoria=c.text.strip()
            print (nombre_categoria)
            url_categoria=c['href']
            if not Categorias.objects.filter(nombre_categoria=nombre_categoria).exists():
                Categorias.objects.create(nombre_categoria=nombre_categoria,url=url_categoria)
            for l in self.traer_libros_categorias(c['href']):
                libro   = self.traer_info_libro((l.find('h3').a['href'][9:]),nombre_categoria)
                print(libro['titulo'])
                if not Libros.objects.filter(titulo=libro['titulo']).exists() :
                    Libros.objects.create(**libro)

    def traer_categorias(self):
        content = self.tratar_get('')
        soup = BeautifulSoup(content, "html.parser")
        categorias = soup.find_all('ul',{'class':'nav nav-list'})[0].find_all('a')
        return categorias[1:]

    def traer_libros_categorias(self, url_categoria, url_pagina_sgte='',libros=[]):
        if url_pagina_sgte=='':
            content = self.tratar_get(url_categoria)
        else:
            content = self.tratar_get(url_pagina_sgte)
        soup    = BeautifulSoup(content, "html.parser")
        pagina  = soup.find('li',{'class':'next'})
        libros  = libros+soup.find_all('ol',{'class':'row'})[0].find_all('li')
        if pagina is not None:
            url_sgte_pagina         =   pagina.a['href']
            url_sgte_pagina_final   =   url_categoria.replace('index.html','')+url_sgte_pagina
            libros_sgte_pg=self.traer_libros_categorias(url_categoria,url_sgte_pagina_final,libros)
            return  libros_sgte_pg
        return libros

    def traer_info_libro(self,url_libro, categoria=''):
        content         =   self.tratar_get('catalogue/'+url_libro)
        soup            =   BeautifulSoup(content, "html.parser")
        info_prodcuto   =   soup.find_all('div',{'class':'col-sm-6 product_main'})[0]
        info_upc        =   soup.find('table',{'class':'table table-striped'}).find_all('tr')
        obj_UPC         =   [obj for obj in info_upc if obj.th.text=='UPC']
        info_imagen     =   soup.find('div',{'class':'thumbnail'})
        return {
        'categoria'             : Categorias.objects.get(nombre_categoria=categoria),
        'titulo'                : info_prodcuto.h1.text,
        'miniatura_url'         : info_imagen.div.img['src'],
        'precio'                : info_prodcuto.p.text.replace("£", ""),
        'cantidad'              : info_prodcuto.find('p',{'class':'instock availability'}).text.strip(),
        'libro_descripcion'     : soup.find_all('p')[3].text,
        'upc'                   : obj_UPC[0].td.text,
        }

class intentar_tejer(TestCase):
    t=el_tejedor(url='http://books.toscrape.com/')
    t.tejer()