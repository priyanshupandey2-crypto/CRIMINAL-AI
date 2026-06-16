from workflows.graph import app_graph

config = {
    "configurable": {
        "thread_id": "test_case_1"
    }
}

result = app_graph.invoke(
    {
        "query": "Where is jaipur?",
        "chat_history": [],
        "retries": 0
    },
    config=config
)

print("\n========================")
print("FINAL ANSWER")
print("========================")
print(result["answer"])

print("\n========================")
print("REVIEW")
print("========================")
print(result["review"])

print("\n========================")
print("SCORE")
print("========================")
print(result["review_score"])