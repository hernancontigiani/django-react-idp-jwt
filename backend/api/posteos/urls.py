from django.urls import path

from . import posteos

urlpatterns = [
    path('posteos/', posteos.PosteosAPIView.as_view(), name='posteos'),
]
