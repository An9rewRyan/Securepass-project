from django.shortcuts import render
from django.http import JsonResponse , HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from main.models import CustomUser
from django.views.decorators.csrf import csrf_protect

# Create your views here.
def home_view(request):
    return render(request, 'base.html')

def register(request):
    if request.method=="POST":
        reg_info_str = list(request.POST)[0]
        reg_info = json.loads(reg_info_str)
        c = CustomUser(username = reg_info["username"], email = reg_info["email"], password = reg_info["password"] )
        c.save()

        return JsonResponse({"status":"sucess"})
        