# Masti Maker Backend
Veo 3.1 Real Video Generation

Deploy:
gcloud run deploy masti-maker-backend --source ./backend --region us-central1 --allow-unauthenticated --set-env-vars GEMINI_API_KEY=YOUR_KEY

API:
POST /generate-video - body: {story, animal, dance, duration}
GET /health
