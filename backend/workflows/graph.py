from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

from workflows.state import AgentState

from agents.rag import retrieve
from agents.research_agent import research
from agents.synthesis_agent import synthesize
from agents.reviewer_agent import review


# ----------------------------
# RAG NODE
# ----------------------------

def rag_node(state: AgentState):

    state["rag_context"] = retrieve(
        state["query"]
    )

    return state


# ----------------------------
# RESEARCH NODE
# ----------------------------

def research_node(state: AgentState):

    state["research_context"] = str(
        research(
            state["query"]
        )
    )

    return state


# ----------------------------
# SYNTHESIS NODE
# ----------------------------

def synthesis_node(state: AgentState):

    history = state.get(
        "chat_history",
        []
    ).copy()

    print("\n========== HISTORY ==========")
    print("FULL STATE:")
    print(state)
    print("=============================")

    answer = synthesize(
        query=state["query"],
        rag_context=state["rag_context"],
        research_context=state["research_context"],
        chat_history="\n".join(history)
    )

    state["answer"] = answer

    history.append(
        f"User: {state['query']}"
    )

    history.append(
        f"Assistant: {answer}"
    )

    state["chat_history"] = history

    return state




# ----------------------------
# REVIEWER NODE
# ----------------------------

def reviewer_node(state: AgentState):

    state["review"] = review(
        query=state["query"],
        answer=state["answer"],
        chat_history="\n".join(
            state.get("chat_history", [])
        )
    )

    return state


# ----------------------------
# REFLECTION LOOP
# ----------------------------

def route_review(state: AgentState):

    review_result = state["review"]

    print("\nReview Result:")
    print(review_result)

    if "APPROVED" in review_result.upper():

        print("Answer Approved")

        return END

    retries = state.get(
    "retries",
    0
    )

    if retries >= 2:

        print("Maximum retries reached")

        return END
    
    state["retries"] = retries + 1
    

    print(
        f"Retrying... Attempt "
        f"{state['retries']}"
    )

    return "synthesis"


# ----------------------------
# BUILD GRAPH
# ----------------------------

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

# Entry Point

workflow.set_entry_point(
    "rag"
)

# Flow

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

# Reflection Loop

workflow.add_conditional_edges(
    "reviewer",
    route_review
)

# ----------------------------
# MEMORY
# ----------------------------

memory = MemorySaver()

app_graph = workflow.compile(
    checkpointer=memory
)