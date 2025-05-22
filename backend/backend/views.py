from django.views.generic import TemplateView
import os

class FrontendAppView(TemplateView):
    template_name = "index.html"

    def get_template_names(self):
        # Serve the React index.html from frontend/dist
        return [os.path.join('frontend', 'dist', 'index.html')]
