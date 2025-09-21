from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Add this line to include transcriber URLs
    path('transcriber/', include('transcriber.urls', namespace='transcription')),
    # Keep your existing webapp URLs
    path('', include('webapp.urls')),
]