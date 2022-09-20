from django.contrib import admin
from django.urls import path, include
from main import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('register/', views.CreateUserView.as_view(), name='register'),
]