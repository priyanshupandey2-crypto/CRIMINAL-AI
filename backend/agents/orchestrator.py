from agents.rag import retrieve
from agents.research_agent import research
from agents.synthesis_agent import synthesize
from agents.reviewer_agent import review


def run_workflow(query: str):

    rag_context = retrieve(query)

    research_context = research(query)

    answer = synthesize(
        query=query,
        rag_context=rag_context,
        research_context=str(research_context)
    )

    review_result = review(
        query=query,
        answer=answer
    )

    return {
        "answer": answer,
        "review": review_result
    }