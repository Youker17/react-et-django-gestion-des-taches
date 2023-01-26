from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import Task
from django.contrib.auth.models import User
from .serializers import TaskSerializer
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
import datetime

# Create your views here.

class TasksList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        print(request.user)
        result = [TaskSerializer(x).data for x in Task.objects.filter(owner=request.user)]
        return Response(data={"data":result}, status=HTTP_200_OK)
    

    def post(self, request):

        data = {**request.data, "owner":request.user.id}
        print(data)
        task = TaskSerializer(data=data)
        
        
        if task.is_valid():
            task.validated_data["owner"] = request.user
            task.save()
            result = [TaskSerializer(x).data for x in Task.objects.all()]
            return Response(data={"data":result,"status":'saved'}, status=HTTP_200_OK)
        
        return Response(data={"status":'content input is required!'}, status=HTTP_400_BAD_REQUEST)
        





class TaskView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            task = Task.objects.get(id=pk)
            return Response(data=TaskSerializer(task).data, status=HTTP_200_OK)
        except Exception as e:
            return Response(data={"status":"not found!"},status=HTTP_404_NOT_FOUND)
    

    def put(self, request, pk):
        task = Task.objects.get(id=pk)
        updated = TaskSerializer(task,data= request.data)
        if updated.is_valid():
            updated.save()
            return Response(data={'status':'updated'}, status=HTTP_200_OK)
        return Response(data={'status':f'there was an error! content input is required !'}, status=HTTP_400_BAD_REQUEST)


    def delete(self, request,pk):
        try:
            Task.objects.get(id = pk).delete()
            return Response(data={'status': 'deleted successfully !'}, status=HTTP_200_OK)
        except Exception as e:
            return Response(data={'status': 'doesnt exist'}, status=HTTP_404_NOT_FOUND)
