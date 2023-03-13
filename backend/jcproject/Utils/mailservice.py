from threading import Thread
from django.core.mail import EmailMessage


class EmailThread(Thread):
    email = None

    def __init__(self, email):
        Thread.__init__(self)
        self.email = email

    def run(self):
        self.email.send()


class MailSender:
    @staticmethod
    def send_mail(message):
        email = EmailMessage(subject=message['email_subject'],
                             body=message['email_body'], to=[message['email_to']])
        EmailThread(email).start()
