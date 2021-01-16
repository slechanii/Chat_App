from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings
from . import models

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        depth = 1
        fields = (
            'user', 
            'channels',
            'username',
            'star_channels'
        )

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Message
        fields = ("id", "content", "sent_date", "sender_id", "destination_id", "sender_name")         


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'id', 'password')


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')

class ChannelSerializer(serializers.ModelSerializer):
    message_set = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = models.Channel
        # messages = MessageSerializer(many=True)    
        fields = ("id", 'name', 'channel_member', 'message_set', 'topic', 'description', 'channel_admin', 'star_channels' )
