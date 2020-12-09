from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Channel(models.Model):
    name = models.CharField(max_length=128)
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    channels = models.ManyToManyField(Channel, related_name="channel_member")

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
    sender = models.OneToOneField(Profile, on_delete=models.CASCADE)
    sent_date = models.DateTimeField(auto_now=True)
    destination = models.ForeignKey(Channel, on_delete=models.CASCADE)