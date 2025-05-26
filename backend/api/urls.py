from django.urls import path 
from .views import CreateNoteView , DeleteNoteView

urlpatterns = [
    path('notes/',CreateNoteView.as_view(), name="note-list"),
    path('notes/delete/<int:pk>',DeleteNoteView.as_view(), name="note_delete"),
]
