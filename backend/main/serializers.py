from rest_framework import serializers
from main.models import CustomUser
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        write_only_fields = ('password',)

    def create(self, validated_data):
        user = ser = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        
        user.set_password(validated_data['password'])
        user.save()
        # Token.objects.create(user=user)

        return user
