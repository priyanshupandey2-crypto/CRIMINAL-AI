from agents.rag import retrieve
from agents.synthesis_agent import synthesize


query = "What is punishment for theft?"

rag_context = retrieve(query)

answer = synthesize(
    query=query,
    rag_context=rag_context,
    research_context=""
)

print(answer)