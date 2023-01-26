from django.urls import path
from . import views



urlpatterns = [
    path('login/', view=views.LoginUser.as_view()),
    path('register/', view=views.ResgisterUser.as_view()),
    path("logout/", view=views.LogoutUser.as_view()),
]
