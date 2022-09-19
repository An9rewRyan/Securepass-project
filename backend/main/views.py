from django.shortcuts import render
from django.http import JsonResponse , HttpResponse
# Create your views here.
def home_view(request):
    return render(request, 'base.html')

def polo(request):

    data = {
        'summary': 'Polo',
        'raw': 'Successful',
    }

    print('json-data to be sent: ', data)

    return JsonResponse(data)   