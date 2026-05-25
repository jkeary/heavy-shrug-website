from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
def contact(request):
    name = request.data.get('name', '').strip()
    email = request.data.get('email', '').strip()
    message = request.data.get('message', '').strip()

    if not name or not email or not message:
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    subject = f'Booking inquiry from {name}'
    body = f'From: {name} <{email}>\n\n{message}'

    send_mail(
        subject,
        body,
        email,
        [settings.BAND_EMAIL],
        fail_silently=False,
    )

    return Response({'success': 'Message sent.'}, status=status.HTTP_200_OK)
