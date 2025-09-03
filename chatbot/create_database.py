from langchain_community.document_loaders import DirectoryLoader, UnstructuredMarkdownLoader
from langchain.text_splitter import NLTKTextSplitter
from langchain.schema import Document 
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
import os
import shutil
import nltk

from dotenv import load_dotenv
load_dotenv()

# Ensure the basic NLTK tokenizer is available (others may not exist)
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

# declare constants (use paths relative to this file so it works from any CWD)
API_KEY = os.getenv("OPENAI_API_KEY")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_PATH = os.path.join(BASE_DIR, "chroma")
DATA_PATH = os.path.join(BASE_DIR, "data")

def main():
    generate_data_store()

def generate_data_store():
    documents = load_documents() # create documents from corpus 
    chunks = split_text(documents) # split documents into chunks
    save_to_chroma(chunks)

def load_documents():
    # Use UnstructuredMarkdownLoader to leverage richer parsing (requires NLTK)
    loader = DirectoryLoader(
        DATA_PATH,
        glob="*.md",
        loader_cls=UnstructuredMarkdownLoader,
        show_progress=True,
    )
    documents = loader.load()
    return documents

def split_text(documents: list[Document]):
    # Sentence-aware splitting with overlap using NLTK
    text_splitter = NLTKTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(chunks)} chunks")

    # for checking (only if enough chunks)
    if len(chunks) > 10:
        document = chunks[10]
        print(document.page_content)
        print(document.metadata)
    return chunks

def save_to_chroma(chunks: list[Document]):
    # clear database if it exists
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)

    # create a new database 
    if not API_KEY:
        raise RuntimeError("OPENAI_API_KEY not set. Please add it to your environment or .env file.")

    embedding_function = OpenAIEmbeddings(
        model="text-embedding-3-small",
        openai_api_key=API_KEY,
    )

    db = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_function,
        persist_directory=CHROMA_PATH,
    )
    db.persist()
    print(f"Saved {len(chunks)} chunks to {CHROMA_PATH}")

if __name__ == "__main__":
    main()