import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")

try:
    genai.configure(api_key=api_key)
    models = genai.list_models()
    print("Models found:")
    for m in models:
        print(f"- {m.name}")
except Exception as e:
    print(f"Error occurred: {e}")
