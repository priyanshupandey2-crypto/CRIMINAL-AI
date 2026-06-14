import os
from dotenv import load_dotenv
from tavily import TavilyClient

load_dotenv()

key = os.getenv("TAVILY_API_KEY")

print("KEY:", key)

client = TavilyClient(api_key=key)

result = client.search(
    query="criminal law india",
    max_results=1
)

print(result)