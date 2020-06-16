from django.urls import path, include

from rest_framework import routers

from .views import SokuhouViewSet

router = routers.DefaultRouter()
router.register('sokuhou', SokuhouViewSet)

urlpatterns = [
    path('', include(router.urls)),
]