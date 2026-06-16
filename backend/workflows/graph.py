import re

from langgraph.graph import (
    StateGraph,
    END
)

from langgraph.checkpoint.memory import (
    MemorySaver
)

from workflows.state import AgentState

from agents.rag import retrieve
from agents.research_agent import research
from agents.synthesis_agent import synthesize
from agents.reviewer_agent import review


# =====================================
# RAG NODE
# =====================================

def rag_node(state: AgentState):

    state["rag_context"] = retrieve(
        state["query"]
    )

    return state


# =====================================
# RESEARCH NODE
# =====================================

def research_node(state: AgentState):

    state["research_context"] = str(
        research(
            state["query"]
        )
    )

    return state


# =====================================
# SYNTHESIS NODE
# =====================================

def synthesis_node(state: AgentState):

    attempt = state.get("retries", 0) + 1

    history = state.get("chat_history", [])
    if not history:
        history = []
    else:
        history = history.copy()

    print(f"\n========== SYNTHESIS ATTEMPT {attempt} ==========")
    print(f"Chat History Length: {len(history)}")
    print("=========================================\n")

    answer = synthesize(
        query=state["query"],
        rag_context=state["rag_context"],
        research_context=state["research_context"],
        chat_history="\n".join(history),
        attempt=attempt
    )

    state["answer"] = answer

    history.append(f"User: {state['query']}")
    history.append(f"Assistant (Attempt {attempt}): {answer}")
    state["chat_history"] = history

    return state


# =====================================
# REVIEWER NODE
# =====================================

def reviewer_node(state: AgentState):

    review_result = review(
        query=state["query"],
        answer=state["answer"],
        chat_history="\n".join(
            state.get(
                "chat_history",
                []
            )
        )
    )

    state["review"] = review_result

    match = re.search(
        r"SCORE:\s*([0-9.]+)",
        review_result
    )

    if match:

        state["review_score"] = float(
            match.group(1)
        )

    else:

        state["review_score"] = 0.0

    return state


# =====================================
# OUT OF SCOPE REJECTION NODE
# =====================================

def rejection_node(state: AgentState):

    review_reason = state.get("review", "")
    reason_match = re.search(
        r"REASON:\s*(.+?)(?:\n|$)",
        review_reason
    )

    if reason_match:
        state["answer"] = f"❌ {reason_match.group(1).strip()}"
    else:
        state["answer"] = "❌ Question is outside Indian criminal law scope."

    return state


# =====================================
# RETRY INCREMENT NODE
# =====================================

def retry_node(state: AgentState):

    retries = state.get("retries", 0)
    state["retries"] = retries + 1

    print(
        f"\nIncrementing retry counter: {retries} → {state['retries']}"
    )

    return state


# =====================================
# REFLECTION ROUTER
# =====================================

THRESHOLD = 7.0
MAX_RETRIES = 3


def route_review(state: AgentState):

    score = state.get(
        "review_score",
        0
    )

    retries = state.get("retries", 0)
    current_attempt = retries + 1

    print("\n========== REVIEW ==========")
    print(state["review"])
    print("============================")

    print(
        f"\nAttempt {current_attempt} - Reviewer Score: {score}"
    )

    if score == 0.0:

        print(
            "\nQuestion is out of scope. Rejecting without retry."
        )

        return "rejection"

    if score >= THRESHOLD:

        print(
            f"\nAttempt {current_attempt} - Answer Approved!"
        )

        return END

    if retries >= MAX_RETRIES:

        print(
            f"\nMaximum retries ({MAX_RETRIES}) reached. Returning best attempt."
        )

        return END

    print(
        f"\nAttempt {current_attempt} score ({score}) below threshold. Moving to retry..."
    )

    return "retry"


# =====================================
# BUILD GRAPH
# =====================================

workflow = StateGraph(
    AgentState
)

workflow.add_node(
    "rag",
    rag_node
)

workflow.add_node(
    "research",
    research_node
)

workflow.add_node(
    "synthesis",
    synthesis_node
)

workflow.add_node(
    "reviewer",
    reviewer_node
)

workflow.add_node(
    "rejection",
    rejection_node
)

workflow.add_node(
    "retry",
    retry_node
)

# =====================================
# ENTRY POINT
# =====================================

workflow.set_entry_point(
    "rag"
)

# =====================================
# FLOW
# =====================================

workflow.add_edge(
    "rag",
    "research"
)

workflow.add_edge(
    "research",
    "synthesis"
)

workflow.add_edge(
    "synthesis",
    "reviewer"
)

workflow.add_edge(
    "rejection",
    END
)

workflow.add_edge(
    "retry",
    "synthesis"
)

# =====================================
# REFLECTION LOOP
# =====================================

workflow.add_conditional_edges(
    "reviewer",
    route_review
)

# =====================================
# MEMORY
# =====================================

memory = MemorySaver()

app_graph = workflow.compile(
    checkpointer=memory
)