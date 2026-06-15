from tavily import TavilyClient
import os
from dotenv import load_dotenv

load_dotenv()

client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

response = client.search(
    query="What is Bharatiya Nyaya Sanhita?",
    max_results=2
)

print(response)