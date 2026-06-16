from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from workflows.graph import app_graph

# -----------------------------------
# FastAPI App
# -----------------------------------

app = FastAPI(
    title="Criminal AI Backend",
    version="1.0"
)

# -----------------------------------
# CORS
# -----------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------
# Request Schema
# -----------------------------------

class ChatRequest(BaseModel):
    message: str


# -----------------------------------
# Home Route
# -----------------------------------

@app.get("/")
def home():

    return {
        "message": "Criminal AI Backend Running Successfully"
    }


# -----------------------------------
# Chat Route
# -----------------------------------

@app.post("/chat")
def chat(req: ChatRequest):

    state = {

        "query": req.message,

        "chat_history": [],

        "rag_context": "",

        "research_context": "",

        "answer": "",

        "review": "",

        "retries": 0

    }

    result = app_graph.invoke(

    state,

    config={
        "configurable": {
            "thread_id": "chat-session-1"
        }
    }

)

    return {

        "response": result.get("answer", ""),

        "review": result.get("review", ""),

        "trace": [

            {
                "id": 1,
                "name": "RAG Agent",
                "status": "completed"
            },

            {
                "id": 2,
                "name": "Research Agent",
                "status": "completed"
            },

            {
                "id": 3,
                "name": "Synthesis Agent",
                "status": "completed"
            },

            {
                "id": 4,
                "name": "Reviewer Agent",
                "status": "completed"
            }

        ],

        "citations": [

            {
                "id": "Qdrant",
                "type": "BNS",
                "title": "Retrieved BNS Context",
                "snippet": result.get("rag_context", "")
            },

            {
                "id": "Research",
                "type": "Web",
                "title": "External Research",
                "snippet": result.get("research_context", "")
            }

        ]

    }