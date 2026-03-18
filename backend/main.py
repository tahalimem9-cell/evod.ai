from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from backend.ai_engine import get_ai_reply

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MODEL
class Message(BaseModel):
    text: str

# ROUTES FIRST
@app.post("/reply")
def reply(message: Message):
    return {"reply": get_ai_reply(message.text)}

@app.get("/")
def home():
    return {"message": "API is running"}

# 🔥 VERY IMPORTANT: MOUNT LAST
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
