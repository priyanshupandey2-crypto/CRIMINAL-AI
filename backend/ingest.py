import os

from dotenv import load_dotenv

load_dotenv()

from langchain_community.document_loaders import PyPDFLoader

from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

from langchain_community.embeddings import (
    HuggingFaceEmbeddings
)

from langchain_qdrant import QdrantVectorStore


print("Loading PDF...")

loader = PyPDFLoader("data/bns.pdf")

docs = loader.load()

print(f"Pages Loaded: {len(docs)}")


print("Splitting documents...")

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

chunks = splitter.split_documents(docs)

print(f"Chunks Created: {len(chunks)}")


print("Loading embedding model...")

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

print("Uploading vectors to Qdrant Cloud...")

QdrantVectorStore.from_documents(
    documents=chunks,
    embedding=embeddings,
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
    collection_name="bns"
)

print("===================================")
print("BNS Knowledge Base Created")
print("Collection Name: bns")
print("Upload Complete")
print("===================================")