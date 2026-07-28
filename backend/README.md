# Team Pillbox EMS - FastAPI Backend & MongoDB API

Production-ready asynchronous backend service built with **FastAPI**, **Motor (MongoDB)**, **JWT Authentication**, and **Discord OAuth**.

## Features
- **FastAPI**: Asynchronous Python framework with auto-generated OpenAPI (`/docs`) docs.
- **MongoDB & Motor**: Non-blocking MongoDB persistence for Staff, Applications, Bulletins, and Certificates.
- **Security & JWT**: Password hashing with Passlib/Bcrypt and JWT session bearer tokens.
- **Discord OAuth**: Seamless integration for FiveM roleplay community discord logins.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Start MongoDB**:
   Ensure MongoDB service is running on `mongodb://localhost:27017` or configure `MONGODB_URL` in `.env`.

3. **Run Dev Server**:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

4. **API Documentation**:
   Access interactive Swagger docs at `http://localhost:8000/docs`.
