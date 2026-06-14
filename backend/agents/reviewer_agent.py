from config.llm import llm

def review(
    query: str,
    answer: str
):

    prompt = f"""
Review the answer.

Question:
{query}

Answer:
{answer}

Check:
Completeness
Accuracy
Relevance

Return only:

APPROVED

or

REJECTED: <reason>
"""

    result = llm.invoke(prompt)

    return result.content