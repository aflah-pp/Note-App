from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Notes


class UserDataSerializer(serializers.ModelSerializer):
    notes_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "notes_count",
        ]

    def get_notes_count(self, obj):
        return Notes.objects.filter(author=obj).count()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password"]

        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CreateNoteSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Notes
        fields = ["id", "title", "content", "created_at", "created_by", "author"]
        extra_kwargs = {"author": {"read_only": True}}
