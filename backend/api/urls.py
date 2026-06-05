from django.urls import path
from .views import CreateNoteView, DeleteNoteView, GetUserView

urlpatterns = [
    path("notes/", CreateNoteView.as_view(), name="note-list"),
    path("me/", GetUserView.as_view(), name="user-profile"),
    path("notes/delete/<int:pk>", DeleteNoteView.as_view(), name="note_delete"),
]
