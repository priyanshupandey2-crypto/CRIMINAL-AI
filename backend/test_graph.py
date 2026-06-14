from workflows.graph import app_graph

result = app_graph.invoke(
    {
        "query": "What is punishment for theft?",
        "rag_context": "",
        "research_context": "",
        "answer": "",
        "review": "",
        "retries": 0
    }
)

print("\n" + "=" * 50)
print("FINAL ANSWER")
print("=" * 50)

print(result["answer"])

print("\n" + "=" * 50)
print("REVIEW")
print("=" * 50)

print(result["review"])