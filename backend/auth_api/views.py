from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication,BasicAuthentication, TokenAuthentication
from rest_framework.authentication import authenticate
from django.contrib.auth import login, logout
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializers

# Create your views here.

class LoginUser(APIView):
    permission_classes =[AllowAny]
    def post(self, request):
        print("in post")
        username = request.data.get("username")
        print(username)
        password = request.data.get("password")
        print(password)
        user = authenticate(request=request,username=username, password=password)
        print(username, password, user)
        if user is None:
            return Response(data={"details":f'no such user !{user}'}, status=HTTP_400_BAD_REQUEST)
        token = Token.objects.get(user=user)
        login(request, user)
        return Response({'message':'you are logged in ','token':token.key})






class ResgisterUser(APIView):
    permission_classes =[AllowAny]
    def post(self, request):
        userser = UserSerializers(data=request.data)
        if userser.is_valid():
            if len(User.objects.filter(username=userser.validated_data["username"])) != 1:
                User.objects.create_user(username=userser.validated_data["username"], password=userser.validated_data["password"])
                return Response(data={"details":"has been saved successfully!"}, status=HTTP_200_OK)
            return Response(data={"details":"user with these"}, status=HTTP_400_BAD_REQUEST)
        return Response(data={"details":"form not valid !"})



class LogoutUser(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        logout(request)
        return Response(data=request.data)


