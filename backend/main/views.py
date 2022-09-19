from django.shortcuts import render
from django.http import JsonResponse , HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.
def home_view(request):
    return render(request, 'base.html')

@csrf_exempt
def register(request):
    if request.method=="POST":
        reg_info_str = list(request.POST)[0]
        reg_info = json.loads(reg_info_str)
    return JsonResponse({"status":"sucess"})
        