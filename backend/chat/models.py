from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Channel(models.Model):
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=128, default="")
    topic = models.CharField(max_length=128, default=" ")
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    channels = models.ManyToManyField(Channel, related_name="channel_member")
    channels_admin = models.ManyToManyField(Channel, related_name="channel_admin")
    

'''
Creates / updates user profile
'''
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()



class Message(models.Model):
    content = models.TextField()
    sender_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    sent_date = models.DateTimeField(auto_now=True)
    destination_id = models.ForeignKey(Channel, on_delete=models.CASCADE)
    sender_name = models.CharField(max_length=128, default="")

'''
Creates / updates messages
'''
@receiver(post_save, sender=Message)
def create_message(sender, instance, created, **kwargs):
    if created:
        profile_name = instance.sender_id.user.username
        instance.sender_name = profile_name
        instance.save()

# @receiver(post_save, sender=Message)
# def save_message(sender, instance, **kwargs):
    # instance..save()