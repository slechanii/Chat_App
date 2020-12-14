from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions, status
from . import models, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view
import json
from rest_framework import authentication, permissions
# Create your views here.


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserProfileSerializer
    queryset = models.Profile.objects.all()

class ChannelViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ChannelSerializer
    queryset = models.Channel.objects.all() 

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MessageSerializer
    queryset = models.Message.objects.all()    

"""
Gives ids and names of all channels user is a part of 
params : profile_id
"""
@api_view(['POST'])
def getUserChannels(request): 
    # permissions_classes = (permissions.IsAuthenticated)   
    subscribed_channels = models.Profile.objects.get(pk=request.data["profile_id"]).channels.values("name", "id")
    return Response(subscribed_channels)

class UserChannels(APIView):
    authentication_classes = [authentication.TokenAuthentication] 
    permissions_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        subscribed_channels = models.Profile.objects.get(pk=request.data["profile_id"]).channels.values("name", "id")
        return Response(subscribed_channels)


class UserList(APIView):
    # permission_classes = (permissions.AllowAny,)
    serializer = serializers.UserSerializer()

    def post(self, request, format=None):
        serializer = serializers.UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
