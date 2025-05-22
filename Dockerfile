# Stage 1: Build React frontend
FROM node:18 AS frontend
WORKDIR /app/frontend

# Copy package files and install deps
COPY frontend/package*.json ./
RUN npm install

# Copy all frontend source
COPY frontend/ ./

# Build optimized static files (Vite build output usually in /dist)
RUN npm run build

# Stage 2: Build Django backend
FROM python:3.11 AS backend
WORKDIR /app/backend

# Install backend python deps
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt

# Copy backend source
COPY backend/ ./

# Copy built frontend from stage 1 into Django static files dir
# Adjust based on your Django STATICFILES_DIRS or how you serve frontend
COPY --from=frontend /app/frontend/dist ./static/

# Set environment variables for Django
ENV DJANGO_SETTINGS_MODULE=backend.settings
ENV STATIC_ROOT=/app/backend/staticfiles

# Collect static files to STATIC_ROOT
RUN python manage.py collectstatic --noinput

# Expose Django port
EXPOSE 8000

# Run Django dev server (change to gunicorn or whatever for prod)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
