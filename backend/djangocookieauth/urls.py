from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('api.urls')),
    path('', include('api.posteos.urls')),
]
