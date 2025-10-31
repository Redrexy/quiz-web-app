from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Leaderboard
from datetime import timedelta
from django.utils.timezone import now
import json

# Create your views here.

def index(request):
    return HttpResponse("This is a test!")

@csrf_exempt
def leaderboard_list(request):
    if request.method == 'GET':
        leaderboard_type = request.GET.get('type')
        leaderboard_date = request.GET.get('date')

        entries = Leaderboard.objects.all()

        if leaderboard_type:
            entries = entries.filter(type=leaderboard_type)

        if leaderboard_date and leaderboard_date != 'all':
            today = now()

            if leaderboard_date == 'day':
                entries = entries.filter(date__date=today.date())
            elif leaderboard_date == 'week':
                week_ago = today - timedelta(days=7)
                entries = entries.filter(date__gte=week_ago)

        entries = entries.order_by('-score')[:20]

        data = [{'id': entry.id, 'name': entry.name, 'score': entry.score, 'date': entry.date, 'type': entry.type} for entry in entries]
        return JsonResponse(data, safe=False)
    
    if request.method == 'POST':
        body = json.loads(request.body)
        entry = Leaderboard.objects.create(name=body.get('name'), score=body.get('score'), type=body.get('type'))
        return JsonResponse({'id': entry.id})