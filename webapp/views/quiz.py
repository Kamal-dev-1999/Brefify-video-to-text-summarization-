from django.shortcuts import redirect

def open_quiz_app(request):
    return redirect('http://localhost:8504')