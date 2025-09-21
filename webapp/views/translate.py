from django.shortcuts import render
from django.contrib import messages
from deep_translator import GoogleTranslator
from langdetect import detect
from langdetect.lang_detect_exception import LangDetectException
from webapp.models import Summary
import logging

# Set up logging
logger = logging.getLogger(__name__)

def translator(request, summary_id):
    summary = Summary.objects.get(id=int(summary_id))
    # Default context: show original text; no translation yet
    context = {
        'summary_id': summary_id,
        'summary_text': summary.summary_text,
        'summary_words': summary.summary_words,
        'duration': summary.duration,
        'title': summary.title,
        'translated': False,  # flag to indicate whether translation has been done
    }
    
    if request.method == 'POST':
        # Get the destination language from the form (default to Hindi "hi")
        destination = request.POST.get('language', 'hi')
        
        try:
            summary_text = summary.summary_text
            lines = summary_text.splitlines()
            translated_lines = []
            
            # Initialize the translator with target language
            translator_instance = GoogleTranslator(target=destination)
            
            for line in lines:
                if not line.strip():  # Skip empty lines
                    translated_lines.append(line)
                    continue
                    
                try:
                    # Detect the language for each line
                    detected_lang = detect(line)
                    
                    # Translate if the line is not already in the destination language
                    if detected_lang != destination:
                        translated_line = translator_instance.translate(line)
                        translated_lines.append(translated_line)
                    else:
                        translated_lines.append(line)
                        
                except LangDetectException:
                    # If language detection fails, attempt translation anyway
                    try:
                        translated_line = translator_instance.translate(line)
                        translated_lines.append(translated_line)
                    except Exception as translate_error:
                        logger.warning(f"Translation failed for line: {line}. Error: {str(translate_error)}")
                        translated_lines.append(line)  # Keep original line if translation fails
                        
                except Exception as line_error:
                    logger.warning(f"Error processing line: {line}. Error: {str(line_error)}")
                    translated_lines.append(line)  # Keep original line if processing fails
            
            translated_text = "\n".join(translated_lines)
            # Update the context with the translated text and flag
            context['out'] = translated_text
            context['translated'] = True
            messages.success(request, 'Translation completed successfully!')
            
        except Exception as e:
            logger.error(f"Translation service error: {str(e)}")
            messages.error(request, 'Translation service is currently unavailable. Please try again later.')
            context['error'] = 'Translation service error. Please try again later.'
    
    return render(request, 'translate.html', context)


def tt(request, summary_id):
    summary=Summary.objects.get(id=summary_id)
    context = {
    'summary_id': summary_id,
    'summary_text': summary.summary_text,
    'summary_words': summary.summary_words,
    'duration': summary.duration,
    'title': summary.title,
    'transcript_words': summary.transcript_words,
    }
    return render (request, 'translate.html', context)