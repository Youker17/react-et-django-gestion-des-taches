from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', view=views.TasksList.as_view()),
    path('tasks/<int:pk>/', view=views.TaskView.as_view()),
]
