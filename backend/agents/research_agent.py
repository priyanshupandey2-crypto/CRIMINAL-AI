import os
from tavily import TavilyClient
from dotenv import load_dotenv

load_dotenv()

client = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)


def research(query: str):

    india_query = f"""
    Indian criminal law, Bharatiya Nyaya Sanhita (BNS), India:
    {query}
    """

    response = client.search(
        query=india_query,
        max_results=5,
        search_depth="advanced",
        include_answer=True,
        include_raw_content=False,
        topic="general"
    )

    return response