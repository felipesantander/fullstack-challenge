# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
import requests

from bs4 import BeautifulSoup
from datetime import timedelta, timezone, datetime
import os
from dataclasses import *
from typing import Any

# Create your tests here.

@dataclass
class categoria():
    nombre          :str = 'SIN NOMBRE'
    libros          :Any = field(default_factory=list)a

@dataclass
class libro():
    src_img        :str = '' 
    titulo         :str = '' 
    precio         :str = '' 
    stock          :str = '' 
    info_upc       :str = '' 
    desc_prod      :str = '' 

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

    def tejer(self):
        for c in self.traer_categorias():
            print (c.text.strip())
            print (c['href'])
            for l in self.traer_libros_categorias(c['href']):
                 self.traer_info_libro((l.find('h3').a['href'][9:]))

    def traer_categorias(self):
        content = self.session.get(self.url, verify=False).content
        soup = BeautifulSoup(content, "html.parser")
        categorias = soup.find_all('ul',{'class':'nav nav-list'})[0].find_all('a')
        return categorias[1:]

    def traer_libros_categorias(self, url_categoria):
        content = self.session.get(self.url+url_categoria, verify=False).content
        soup = BeautifulSoup(content, "html.parser")
        libros = soup.find_all('ol',{'class':'row'})[0].find_all('li')
        return libros
        # libro = libros[0]
        #url=libro  =libro.find('h3').a['href']

    def traer_info_libro(self,url_libro):
        print (url_libro)
        content = self.session.get(self.url+'catalogue/'+url_libro, verify=False).content
        soup = BeautifulSoup(content, "html.parser")
        info_prodcuto   = soup.find_all('div',{'class':'col-sm-6 product_main'})[0]
        info_imagen     = soup.find('div',{'class':'thumbnail'
        src_img         =   info_imagen.div.img['src']   
        titulo          =   info_prodcuto.h1.text
        precio          =   info_prodcuto.p.text
        stock           =   info_prodcuto.find('p',{'class':'instock availability'}).text.strip()
        info_upc        =   soup.find('table',{'class':'table table-striped'}).find_all('tr')
        desc_prod       =   soup.find_all('p')[3]
        #   print (info_upc)
        obj_UPC= [obj for obj in info_upc if obj.th.text=='UPC']
        print (titulo)


t=el_tejedor(url='http://books.toscrape.com/')
t.tejer()