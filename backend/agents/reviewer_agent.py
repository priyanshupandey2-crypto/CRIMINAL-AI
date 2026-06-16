from config.llm import llm


def review(
    query: str,
    answer: str,
    chat_history: str = ""
):

    prompt = f"""
You are a Legal Answer Reviewer.

Previous Conversation:
{chat_history}

Question:
{query}

Answer:
{answer}

Review Criteria:

1. Check factual accuracy.
2. Check completeness.
3. Check relevance to the user's question.
4. Approve if the answer is supported by:
   - current BNS retrieval context, OR
   - previous conversation memory.
5. Do NOT reject solely because the current retrieval result does not contain a section mentioned earlier.
6. Follow-up questions may rely on previous conversation context.
7. Reject only if the answer is clearly incorrect, misleading, incomplete, or hallucinated.

Return ONLY one of:

APPROVED

or

REJECTED: <reason>
"""

    result = llm.invoke(prompt)

    return result.content