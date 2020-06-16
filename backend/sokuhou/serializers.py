from rest_framework import serializers

from .models import Sokuhou

class SokuhouSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Sokuhou
        fields = ('content', 'created_at')