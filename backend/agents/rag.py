import os

from dotenv import load_dotenv

load_dotenv()

from langchain_community.embeddings import (
    HuggingFaceEmbeddings
)

from langchain_qdrant import QdrantVectorStore


embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vector_store = QdrantVectorStore.from_existing_collection(
    embedding=embeddings,
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
    collection_name="bns"
)

retriever = vector_store.as_retriever(
    search_kwargs={"k": 5}
)


def retrieve(query: str):

    docs = retriever.invoke(query)

    return "\n\n".join(
        doc.page_content
        for doc in docs
    )