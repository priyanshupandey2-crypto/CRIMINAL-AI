# Frontend UX & Product Design

**Issue #5**
**Assignee:** Uday Bharadwaj
**Milestone:** Frontend Design & Client-Side Architecture

## Overview

This task focuses on designing the frontend user experience and planning the React client-side architecture for the AI-powered Legal Assistant platform.

The goal is to create a transparent, responsive, and scalable interface that enables users to:

* Interact through conversational legal queries.
* Track live multi-agent execution.
* View legal citations and retrieval sources.
* Understand reviewer validation and self-correction loops.
* Navigate legal documents efficiently.

### Technology Stack

* React (Vite)
* Tailwind CSS
* Axios
* React Router
* Context API / Zustand (Future Scope)

---

## Objectives

### User Experience

* Build an intuitive conversational dashboard.
* Provide visibility into agent execution workflows.
* Present legal citations in an accessible format.
* Surface reviewer feedback and regeneration events.
* Maintain responsiveness across devices.

### Architecture

* Establish a scalable React project structure.
* Standardize reusable UI components.
* Create a foundation for future modules such as FIR drafting and legal document uploads.

---

## UX Research Focus

### Conversational Legal Interfaces

Research areas:

* Legal chatbot usability patterns
* Explainable AI interfaces
* Citation transparency
* Long-form legal document readability
* Multi-step workflow visualization

### Key Design Principles

1. **Transparency**

   * Show what the AI is doing.
   * Display retrieval and validation steps.

2. **Trust**

   * Attach citations to every legal response.
   * Provide source previews.

3. **Progressive Disclosure**

   * Show concise answers first.
   * Allow users to expand legal references when needed.

4. **Scalability**

   * Support future legal tools and workflows.

---

## Dashboard Layout

```text
+------------------------------------------------------+
| Header                                               |
+------------------------------------------------------+
| Sidebar      | Chat Window           | Sources Panel |
|              |                       |               |
| Conversations| User Query            | BNS Clauses   |
| History      | AI Responses          | Qdrant Docs   |
|              | Agent Trace           | Web Sources   |
+------------------------------------------------------+
| Input Field                                         |
+------------------------------------------------------+
```

### Layout Sections

#### Sidebar

* Conversation History
* New Chat Button
* Recent Queries

#### Chat Window

* User Messages
* AI Responses
* Agent Activity Timeline
* Reviewer Feedback

#### Sources Panel

* BNS References
* Retrieved Legal Documents
* External Web Sources

---

## Agent Trace Visualization

The Agent Trace Panel displays live execution states.

### Example Flow

```text
User Query Submitted
        ↓
Orchestrator Routing
        ↓
RAG Searching Qdrant
        ↓
Context Assembly
        ↓
Reviewer Evaluation
        ↓
Final Response
```

### States

| State   | Description         |
| ------- | ------------------- |
| Pending | Waiting             |
| Running | Currently executing |
| Success | Completed           |
| Failed  | Error occurred      |

---

## Reviewer Feedback Component

Displays reviewer validation events.

### Example

```text
⚠ Reviewer detected inconsistency.

Regenerating response using additional context...
```

### States

* Reviewing
* Regenerating
* Approved
* Failed Validation

---

## Citation Interface

### Citation Card

```text
+--------------------------------+
| BNS Section 302                |
| Criminal Intimidation          |
| Preview Snippet                |
| View Full Reference →          |
+--------------------------------+
```

### Supported Sources

#### Qdrant Retrievals

* Similarity Score
* Clause Name
* Retrieved Content

#### External Sources

* Title
* Source URL
* Preview Snippet

---

## Future Expansion Support

The design must accommodate:

### FIR Drafting Module

```text
Dashboard
├── Chat
├── FIR Drafting
├── Upload Center
└── Legal Explorer
```

### BNS Explorer

Features:

* Chapter Navigation
* Section Search
* Bookmarking
* Quick References

---

## User Flow

```text
User Query
    ↓
Frontend Request
    ↓
API Layer
    ↓
Orchestrator Agent
    ↓
RAG Retrieval
    ↓
Reviewer Validation
    ↓
Citation Generation
    ↓
Frontend Rendering
```

---

## Proposed React Architecture

```text
frontend/src
│
├── assets/
│
├── components/
│   ├── chat/
│   │   ├── ChatContainer.jsx
│   │   ├── ChatBubble.jsx
│   │   └── ChatInput.jsx
│   │
│   ├── agent/
│   │   ├── AgentTracePanel.jsx
│   │   ├── AgentStep.jsx
│   │   └── AgentStatusBadge.jsx
│   │
│   ├── citations/
│   │   ├── CitationCard.jsx
│   │   ├── CitationPanel.jsx
│   │   └── SourcePreview.jsx
│   │
│   ├── feedback/
│   │   └── FeedbackBanner.jsx
│   │
│   └── common/
│       ├── Button.jsx
│       ├── Loader.jsx
│       ├── Skeleton.jsx
│       └── Modal.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   └── Explorer.jsx
│
├── services/
│   ├── api.js
│   └── agentService.js
│
├── hooks/
│   ├── useChat.js
│   └── useAgentTrace.js
│
├── context/
│   └── ChatContext.jsx
│
├── utils/
│   ├── constants.js
│   └── formatDate.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## UI Component Inventory

| Component        | Purpose                  |
| ---------------- | ------------------------ |
| ChatContainer    | Chat state management    |
| ChatBubble       | User and AI messages     |
| ChatInput        | Query input              |
| AgentTracePanel  | Agent execution tracking |
| AgentStatusBadge | Agent status indicators  |
| CitationCard     | Source references        |
| CitationPanel    | Citation sidebar         |
| FeedbackBanner   | Reviewer alerts          |
| Button           | Shared action button     |
| Loader           | Loading indicators       |
| Skeleton         | Placeholder states       |
| Modal            | Expanded views           |

---

## Tailwind Design Guidelines

### Colors

| Type       | Utility    |
| ---------- | ---------- |
| Primary    | blue-600   |
| Secondary  | indigo-600 |
| Success    | green-500  |
| Warning    | amber-500  |
| Error      | red-500    |
| Background | slate-50   |

### Styling

* `rounded-lg`
* `rounded-xl`
* `shadow-sm`
* `shadow-md`
* `shadow-lg`

---

## Axios Configuration

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 30000,
});

export default api;
```

---

## Deliverables

* UX Research Documentation
* Dashboard Wireframes
* Citation UI Design
* Agent Trace Visualization
* Reviewer Feedback UI
* User Flow Diagrams
* React Architecture Blueprint
* Component Inventory
* Tailwind Design Guidelines
* Axios Service Layer Setup

---

## Expected Outcome

A production-ready frontend design system that provides transparency into the legal AI workflow while maintaining a clean, intuitive, and scalable user experience for legal research and future legal automation features.
