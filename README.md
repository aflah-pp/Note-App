# NoteApp

A simple web app where users create, view, and delete notes. Backend powered by **Django**, frontend by **React**. Includes user authentication and personal note storage.

---

## Features

- **Create Notes**: Add notes with title & content.
- **View Notes**: See all your notes.
- **Delete Notes**: Remove any note you own.
- **User Authentication**: Login required to manage notes.

---

## Tech Stack

- **Frontend**: React.js  
- **Backend**: Django  
- **Database**: SQLite (default, can be changed)  
- **Auth**: JWT Authentication  
- **Deployment**:  
  - Frontend: [NoteApp React](https://note-app-1-4kwr.onrender.com/) (hosted on Render)  
  - Backend: [NoteApp Django API](https://note-app-5dzx.onrender.com/) (hosted on Render)

---

## Setup Instructions

### Backend (Django)

1. Clone backend repo:
    ```bash
    git clone https://github.com/aflah-pp/Note-App.git
    cd backend
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Apply migrations:
    ```bash
    python manage.py migrate
    ```

4. Run the server:
    ```bash
    python manage.py runserver
    ```

5. Backend runs on: `http://127.0.0.1:8000` by default.

---

### Frontend (React)

1. Clone frontend repo:
    ```bash
    git clone https://github.com/aflah-app/Note-App.git
    cd frontend-NoteApp
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run dev server:
    ```bash
    npm run dev
    ```

4. Frontend runs on: `http://localhost:3000` by default.

---

## Updated Backend URLs and Routing

- Backend API base URL: `https://note-app-5dzx.onrender.com/`
- Frontend URL: `https://note-app-1-4kwr.onrender.com/`

Make sure your frontend calls API endpoints with the backend base URL above.

### Example API URLs in backend `urls.py`

```python
from django.urls import path
from .views import NoteListCreateView, NoteDetailView, UserRegistrationView, UserLoginView

urlpatterns = [
    path('api/notes/', NoteListCreateView.as_view(), name='notes-list-create'),
    path('api/notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    path('api/register/', UserRegistrationView.as_view(), name='register'),
    path('api/login/', UserLoginView.as_view(), name='login'),
]
