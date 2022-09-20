from django.shortcuts import render
from django.http import JsonResponse , HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from main.models import CustomUser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework import permissions
from rest_framework import mixins, views
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

# Create your views here.
def home_view(request):

    return render(request, 'base.html')

class CreateUserView(CreateAPIView):
    model = User
    permission_classes = [
    permissions.AllowAny 
    ]
    serializer_class = UserSerializer
    def create(self, request, *args, **kwargs):
        reg_info_str = list(request.POST)[0]
        reg_info = json.loads(reg_info_str)
        serializer = UserSerializer(data=reg_info)
        print(serializer.is_valid())
        serializer.is_valid(raise_exception=True)  
        self.perform_create(serializer)
        print("Here#!")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



        