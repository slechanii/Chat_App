from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions, status
from . import models, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view
import json
from rest_framework import authentication, permissions
from django.db.models import F
from django.db.models import Count
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
Add user to a channel (id)
params: channel_id, user_id
"""
@api_view(["POST"])
def addUserToChannel(request):
    user_to_add = models.Profile.objects.get(pk=request.data["profile_id"])
    channel = models.Channel.objects.get(pk=request.data["channel_id"])
    user_to_add.channels.add(channel)
    return Response("User added!")


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
Gives all members NOT PART of a channel (id and username)
params: channel_id
"""
@api_view(["POST"])
def getNonChannelMembers(request):
    unsubscribed_users = models.Profile.objects.exclude(channels__in=[request.data["channel_id"]])
    users_list = unsubscribed_users.values("id", "username").annotate(user_id=F('id')).values('user_id', 'username')
    return Response(users_list)

"""
Finds or creates a channel (user_chat) for both users, adds channel to emitter shortlist
params: emitter_profile_id, receiver_profile_id
"""
@api_view(["POST"])
def startChat(request):
    user_list = [int(request.data["emitter_profile_id"]), int(request.data["receiver_profile_id"])]    
    query = models.Channel.objects.annotate(count=Count('channel_member')).filter(count=len(user_list))
    for user in user_list:
        query = query.filter(channel_member=user, is_user_chat=True)
    if query.exists():      
        channel_id = int(query.values_list("id", flat=True)[0])
        emitter = models.Profile.objects.get(pk=int(request.data["emitter_profile_id"]))
        receiver = models.Profile.objects.get(pk=int(request.data["receiver_profile_id"]))
        emitter.user_chats.add(channel_id)
        emitter.save()
        # receiver.user_chats.add(channel_id)
        # receiver.save()
        return Response("OK")
    else:        
        # Creates channel, adds both users to it and adds it to emitter shortlist 
        chat = models.Channel(name="test", is_user_chat=True)
        chat.save()
        chat.channel_member.add(int(request.data["emitter_profile_id"]))
        chat.channel_member.add(int(request.data["receiver_profile_id"]))
        chat.user_chats.add(int(request.data["emitter_profile_id"]))
        # chat.user_chats.add(int(request.data["receiver_profile_id"]))
        chat.save() 
        return Response("EMPTY") 
    # unsubscribed_users = models.Profile.objects.exclude(channels__in=[request.data["channel_id"]])
    # users_list = unsubscribed_users.values("id", "username").annotate(user_id=F('id')).values('user_id', 'username')
    # return Response(users_list)

"""
Removes given channel from user shortlist 
params : profile_id, channel_id
"""
@api_view(['POST'])
def leaveChat(request): 
    models.Profile.objects.get(pk=request.data["profile_id"]).user_chats.remove(request.data["channel_id"])
    # permissions_classes = (permissions.IsAuthenticated)   
    # subscribed_channels = models.Profile.objects.get(pk=request.data["profile_id"]).channels.filter(is_user_chat=False).values("name", "id")
    return Response("channel left")



"""
Gives ids and names of all channels user is a part of 
params : profile_id
"""
@api_view(['POST'])
def getUserChannels(request): 
    # permissions_classes = (permissions.IsAuthenticated)   
    subscribed_channels = models.Profile.objects.get(pk=request.data["profile_id"]).channels.filter(is_user_chat=False).values("name", "id")
    return Response(subscribed_channels)

"""
Gives ids and names of all users  
params : NONE
"""
@api_view(['GET'])
def getUsers(request): 
   users_list = models.Profile.objects.all().values("id", "username").annotate(user_id=F('id')).values('user_id', 'username')
   return Response(users_list)


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
        subscribed_channels = models.Profile.objects.get(pk=request.data["profile_id"]).channels.filter(is_user_chat=False).values("name", "id")
        user_chats = models.Profile.objects.get(pk=request.data["profile_id"]).user_chats.filter(is_user_chat=True).values("name", "id")
        starred_channels = models.Profile.objects.get(pk=request.data["profile_id"]).star_channels.values("name", "id")
        # add message count in channels
        for channel in subscribed_channels:
            message_count = models.Message.objects.filter(destination_id=channel["id"]).count()
            channel["message_count"] = message_count
        
        # add message count in user chats
        for channel in user_chats:
            message_count = models.Message.objects.filter(destination_id=channel["id"]).count()
            channel["message_count"] = message_count


        # add usernames of users in user chats 
        for chats in user_chats:
            current_chat_ids = models.Profile.objects.filter(channels__in=[chats["id"]])
            usernames = []
            for user_id in current_chat_ids:
                usernames.append(user_id.username)
            chats["usernames"] = usernames
        return Response({"subscribed_channels": subscribed_channels, "starred_channels": starred_channels, "user_chats":user_chats })


class UserList(APIView):
    # permission_classes = (permissions.AllowAny,)
    serializer = serializers.UserSerializer()

    def post(self, request, format=None):
        serializer = serializers.UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
