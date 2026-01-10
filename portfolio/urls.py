from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('projects/', views.projects, name='projects'),
    path('', views.home, name='home'),
    path('projects/<slug:slug>/', views.project_detail_partial, name='project_detail'),
]