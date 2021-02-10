from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from pprint import pprint
from django.db.models.signals import m2m_changed

class ReadCount(models.Model):
    user_id = models.ForeignKey('Profile', on_delete=models.CASCADE)
    read_count = models.IntegerField(default=-1)

class Channel(models.Model):
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=128, default="")
    topic = models.CharField(max_length=128, default=" ")
    is_user_chat = models.BooleanField(default=False)
    message_read_count = models.ManyToManyField(ReadCount, blank=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(default="John", max_length=24)
    channels = models.ManyToManyField(Channel, related_name="channel_member")
    channels_admin = models.ManyToManyField(Channel, related_name="channel_admin")
    star_channels = models.ManyToManyField(Channel, blank=True, related_name="star_channels")
    user_chats = models.ManyToManyField(Channel, blank=True, related_name="user_chats")



'''
Creates / updates user profile
'''
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, username=instance.username)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

'''
    Creates read count for channel creator when channel is created

@receiver(m2m_changed, sender=Channel)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        pprint(vars(instance))
        # print(instance.name)
        # print(instance.channel_member.all())
        # instance.message_read_count

'''


'''
Called each time the members of a channel changes (add AND delete)
and returns channel

For each user in channel => check if readcount exists
                         => if no create and save + save to channel
                         => if yes nothing


If user is added => create read count with LAST user and add it to the channel

If user is deleted => delete read count from chat then delete read count


Save channel at the end
'''
def handle_read_counts(sender, instance, action, **kwargs):
    if action is "post_add":
        print("------------------")

        #If readcount doesn't exist for this user in channel
        if not instance.message_read_count.filter(user_id=instance.channel_member.last()) :
            new_count = ReadCount(user_id=instance.channel_member.last(),
            read_count= Message.objects.filter(destination_id=instance.id).count())            
            print("Saving new read count of ",
            Message.objects.filter(destination_id=instance.id).count(),
            " messages for new user ",  instance.channel_member.last(), " in chat ", instance.name)
            new_count.save()
            instance.message_read_count.add(new_count)
            instance.save()
        print("------------------")

m2m_changed.connect(handle_read_counts, sender=Channel.channel_member.through)



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
        print(instance.destination_id.is_user_chat)
        # dest = Channel.objects.get(pk=instance.destination_id) 
        if instance.destination_id.is_user_chat is True:
           members = instance.destination_id.channel_member.all()
           for member in members:
               member.user_chats.add(instance.destination_id)
               member.save() 
        #    print(instance.destination_id.channel_member.all()) 
        # print("ID CHAN: " + dest.is_user_chat)

# @receiver(post_save, sender=Message)
# def save_message(sender, instance, **kwargs):
    # instance..save()