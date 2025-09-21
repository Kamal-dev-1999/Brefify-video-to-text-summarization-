from django.shortcuts import render, redirect
from django.utils import timezone
from .models import Transcription

def live_transcription(request):
    if request.method == 'POST':
        content = request.POST.get('transcript', '')
        if content:
            Transcription.objects.create(content=content)
            return redirect('transcription:live_transcription')
    return render(request, 'transcriber/live.html')

def saved_transcripts(request):
    transcripts = Transcription.objects.all().order_by('-created_at')
    return render(request, 'transcriber/saved.html', {'transcripts': transcripts})