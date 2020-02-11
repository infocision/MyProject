from report import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('sign_in/', views.sign_in_view, name='sign_in'),
    path('dashboard/', views.dashboard, name='dashboard'),
]

