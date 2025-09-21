from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from .views import *
app_name = "transcription"

urlpatterns = [
    path('', live_transcription, name='live_transcription'),
    path('saved/', saved_transcripts, name='saved_transcripts'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
