from django.urls import path
from . import views

urlpatterns = [
    path('', views.leaderboard_list, name='leaderboard_list'),
    path('test/', views.index, name="test"),
]