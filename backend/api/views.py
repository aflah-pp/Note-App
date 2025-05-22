from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Notes
from .serializers import UserSerializer, CreateNoteSerializer
from rest_framework.permissions import IsAuthenticated ,AllowAny
from rest_framework import generics

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    
class CreateNoteView(generics.ListCreateAPIView):
    queryset = Notes.objects.all()
    serializer_class = CreateNoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Notes.objects.filter(author=user)  
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else :
            print(serializer.errors)
            
            
class DeleteNoteView(generics.DestroyAPIView):
    queryset = Notes.objects.all()
    serializer_class = CreateNoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Notes.objects.filter(author=user)  