from django.db import models

# Create your models here.
class Leaderboard(models.Model):
    name = models.CharField(max_length=20)
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.name} - {self.score}"
