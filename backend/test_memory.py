from workflows.graph import app_graph

config = {
    "configurable": {
        "thread_id": "user_1"
    }
}

# ====================================
# QUERY 1
# ====================================

print("\n" + "=" * 60)
print("QUERY 1")
print("=" * 60)

result1 = app_graph.invoke(
    {
        "query": "I have a case where a clerk stole ₹50,000 from his employer. Remember this case."
    },
    config=config
)

print("\nANSWER 1:\n")
print(result1["answer"])

# ====================================
# QUERY 2
# ====================================

print("\n" + "=" * 60)
print("QUERY 2")
print("=" * 60)

result2 = app_graph.invoke(
    {
        "query": "Which section applies?"
    },
    config=config
)

print("\nANSWER 2:\n")
print(result2["answer"])

# ====================================
# QUERY 3
# ====================================

print("\n" + "=" * 60)
print("QUERY 3")
print("=" * 60)

result3 = app_graph.invoke(
    {
        "query": "What punishment can be imposed?"
    },
    config=config
)

print("\nANSWER 3:\n")
print(result3["answer"])

# ====================================
# QUERY 4
# ====================================

print("\n" + "=" * 60)
print("QUERY 4")
print("=" * 60)

result4 = app_graph.invoke(
    {
        "query": "Was this theft committed by a servant or an outsider?"
    },
    config=config
)

print("\nANSWER 4:\n")
print(result4["answer"])