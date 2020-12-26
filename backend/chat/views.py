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
Stars / Unstar given channel in profile depending on current state
params : user_id, channel_id
"""
@api_view(["POST"])
def starChannel(request):
    profile = models.Profile.objects.get(pk=request.data["profile_id"])
    channel = models.Channel.objects.get(pk=request.data["channel_id"]) 
    starred_channels = profile.star_channels.all()
    if channel not in starred_channels:
        profile.star_channels.add(channel)
    else:
        profile.star_channels.remove(channel)
    profile.save()
    return Response("OK")


"""
Gives all members of a channel (id and username)
params: channel_id
"""
@api_view(["POST"])
def getChannelMembers(request):
    subscribed_users = models.Profile.objects.filter(channels__in=[request.data["channel_id"]])
    users_list = subscribed_users.values("id", "username")
    return Response(users_list)

"""
Gives ids and names of all channels user is a part of 
params : profile_id
"""
@api_view(['POST'])
def getUserChannels(request): 
    # permissions_classes = (permissions.IsAuthenticated)   
    subscribed_channels = models.Profile.objects.get(pk=request.data["profile_id"]).channels.values("name", "id")
    return Response(subscribed_channels)

class ProfileView(APIView):
    authentication_classes = [authentication.TokenAuthentication] 
    permissions_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        if request.data["username"] is not None:
            user = models.User.objects.get(username=request.data["username"])
            profile = models.Profile.objects.get(user=user)
            return Response(profile.id)
        return Response("Error, provide username")    

class UserChannels(APIView):
    authentication_classes = [authentication.TokenAuthentication] 
    permissions_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        subscribed_channels = models.Profile.objects.get(pk=request.data["profile_id"]).channels.values("name", "id")
        starred_channels = models.Profile.objects.get(pk=request.data["profile_id"]).star_channels.values("name", "id")
        return Response({"subscribed_channels": subscribed_channels, "starred_channels": starred_channels })


class UserList(APIView):
    # permission_classes = (permissions.AllowAny,)
    serializer = serializers.UserSerializer()

    def post(self, request, format=None):
        serializer = serializers.UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
