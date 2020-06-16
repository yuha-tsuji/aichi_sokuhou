from rest_framework import viewsets

from .models import Sokuhou
from .serializers import SokuhouSerializer
# Create your views here.

class SokuhouViewSet(viewsets.ModelViewSet):
    queryset = Sokuhou.objects.all()
    serializer_class = SokuhouSerializer
