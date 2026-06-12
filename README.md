# Criminal AI – BNS Legal Assistant

## Overview

Criminal AI is an agentic legal assistant focused on the **Bharatiya Nyaya Sanhita (BNS), 2023**. The application helps users understand criminal law provisions, identify potentially applicable BNS sections, retrieve relevant legal information, and generate simplified legal explanations.

The system combines:

* Retrieval-Augmented Generation (RAG)
* Multi-Agent Architecture
* External Legal Research
* Reflection & Review Loops
* Vector Search using Qdrant

This project is built as part of the FDE Team Activity using LangChain and LangGraph.

---

## Features

### BNS Legal Question Answering

Ask questions such as:

* What section applies to theft?
* What is the punishment for criminal intimidation?
* What BNS provisions apply to cyber fraud?
* Explain organized crime under BNS.

### Retrieval-Augmented Generation (RAG)

Retrieve relevant sections directly from the BNS knowledge base using embeddings and vector search.

### External Research

Use Tavily Search and external legal sources to enrich responses with up-to-date information.

### Multi-Agent Workflow

* Orchestrator Agent
* RAG Agent
* Research Agent
* Synthesis Agent
* Reviewer Agent

### Reflection Loop

The Reviewer Agent validates generated responses and provides feedback for regeneration until:

* The answer is approved, or
* The retry limit is reached.

### Explainable Responses

Responses include:

* Relevant BNS sections
* Plain-language explanation
* Punishment details
* Supporting sources

---

## Architecture

```text
User
  |
  v
Orchestrator Agent
  |
  +----------------------+
  |                      |
  v                      v
RAG Agent          Research Agent
(Qdrant)           (Tavily + APIs)
  |                      |
  +----------+-----------+
             |
             v
      Synthesis Agent
             |
             v
       Reviewer Agent
             |
       Reflection Loop
             |
             v
       Final Response
```

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* FastAPI
* LangChain
* LangGraph

### AI & Search

* Gemini / OpenAI
* Tavily Search

### Vector Database

* Qdrant (Local Storage)

### Document Processing

* PyPDF

---

## Project Structure

```text
criminal-ai/

backend/
│
├── agents/
│   ├── orchestrator.py
│   ├── rag_agent.py
│   ├── research_agent.py
│   ├── synthesis_agent.py
│   └── reviewer_agent.py
│
├── workflows/
│   └── graph.py
│
├── vector_db/
│
├── data/
│   └── bns.pdf
│
├── ingest.py
├── main.py
└── .env

frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   └── App.jsx
│
└── package.json
```

---

## Agent Responsibilities

### Orchestrator Agent

Coordinates workflow execution and routes tasks between agents.

### RAG Agent

Retrieves relevant BNS sections using vector similarity search.

### Research Agent

Collects external information using Tavily and legal APIs.

### Synthesis Agent

Combines retrieved and researched information into a coherent response.

### Reviewer Agent

Evaluates:

* Accuracy
* Completeness
* Relevance
* Hallucinations

Provides feedback for regeneration when needed.

---

## Reflection Loop

```text
Generate Response
       |
       v
Reviewer Agent
       |
Approved?
  /       \
 No       Yes
  |         |
Feedback    |
  |         |
  +---------+
       |
Regenerate
```

---

## Setup

### Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate
# Windows:
# venv\Scripts\activate

pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file:

```env
GOOGLE_API_KEY=YOUR_KEY
TAVILY_API_KEY=YOUR_KEY
```

### Run Backend

```bash
uvicorn main:app --reload
```

Backend:

```text
http://localhost:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Building the Knowledge Base

Place the official BNS PDF inside:

```text
backend/data/bns.pdf
```

Run ingestion:

```bash
python ingest.py
```

This will:

1. Load the PDF
2. Split text into chunks
3. Generate embeddings
4. Store vectors in Qdrant

---

## Future Enhancements

* FIR Draft Generator
* BNS Section Explorer
* Conversation Memory
* Human-in-the-Loop Review
* Citation Viewer
* Case Law Retrieval
* Multi-Language Support
* Voice Assistant

---

## Team

FDE Team Activity Project

Criminal AI – BNS Legal Assistant
Powered by LangChain, LangGraph, Tavily, Qdrant, and React.
