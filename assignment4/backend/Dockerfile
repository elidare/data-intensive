# backend/Dockerfile
FROM python:3.11-slim

RUN apt-get update

WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY backend ./

# Copy React build
COPY frontend/dist ./frontend/dist

WORKDIR /app/

# Expose port
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
