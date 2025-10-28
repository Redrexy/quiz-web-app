from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Leaderboard
import json

# Create your views here.

def index(request):
    return HttpResponse("This is a test!")

@csrf_exempt
def leaderboard_list(request):
    if request.method == 'GET':
        entries = Leaderboard.objects.all().order_by('-score')[:10]
        data = [{'id': entry.id, 'name': entry.name, 'score': entry.score, 'date': entry.date, 'type': entry.type} for entry in entries]
        return JsonResponse(data, safe=False)
    
    if request.method == 'POST':
        body = json.loads(request.body)
        entry = Leaderboard.objects.create(name=body.get('name'), score=body.get('score'), type=body.get('type'))
        return JsonResponse({'id': entry.id})