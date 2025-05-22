from django.conf import settings
from django.views.generic import View
from django.http import FileResponse
import os

class FrontendAppView(View):
    def get(self, request):
        file_path = os.path.join(settings.BASE_DIR, 'staticfiles', 'index.html')
        return FileResponse(open(file_path, 'rb'))
