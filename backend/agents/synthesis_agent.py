from config.llm import llm


def synthesize(
    query: str,
    rag_context: str,
    research_context: str = ""
):
    
    prompt = f"""
        You are a Criminal Law AI Assistant.

        Use the information below to answer the user's legal question.

        USER QUESTION:
        {query}

        BNS KNOWLEDGE BASE:
        {rag_context}

        EXTERNAL RESEARCH:
        {research_context}

        Instructions:
        1. Answer using BNS provisions.
        2. Mention relevant sections if available.
        3. Explain punishment clearly.
        4. Keep response factual.
        5. Do not hallucinate.
        6. If information is unavailable, say so.

        Format:

        Summary:
        ...

        Relevant BNS Provisions:
        ...

        Punishment:
        ...

        Notes:
        ...
    """

    response = llm.invoke(prompt)

    return response.content