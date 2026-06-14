from typing import TypedDict, List


class AgentState(TypedDict):

    query: str

    chat_history: List[str]

    rag_context: str

    research_context: str

    answer: str

    review: str

    retries: int