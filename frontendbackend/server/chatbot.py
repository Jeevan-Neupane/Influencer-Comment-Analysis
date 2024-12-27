from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.docstore.document import Document
from langchain.prompts import ChatPromptTemplate
from langchain.load import dumps, loads
from operator import itemgetter
import os
from dotenv import load_dotenv
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
import pandas as pd
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
# from langchain_openai import OpenAIEmbeddings
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.docstore.document import Document
from langchain.document_loaders import TextLoader 
from langchain import PromptTemplate

load_dotenv()

gemini_key = os.getenv("GOOGLE_API_KEY")
llm = ChatGoogleGenerativeAI(google_api_key=gemini_key,model="gemini-pro",
                 temperature=0.7, top_p=0.85)
def load_text_data(filename):
  with open(filename, "r", encoding="utf-8") as f:
    return f.read()

# Function to process and store data
def process_and_store(filename, model_name="models/embedding-001", persist_dir="./my_db"):
  # Load text data
  text = load_text_data(filename)
  texts = text.split("\n")
#   print(texts)
  # Create documents
  docs =  [Document(page_content=text, metadata={"source": "local"}) for text in texts]
  


  # Split documents
  text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
  splits = text_splitter.split_documents(docs)

  # Create vector store with Gemini embeddings
  my_db = Chroma.from_documents(

      documents=splits,
      collection_name="my_data",
      embedding=GoogleGenerativeAIEmbeddings(model=model_name),
    #   persist_directory=persist_dir
  )

  # Return the vector store (retriever) for searching
  return my_db.as_retriever()

# Function to perform retrieval
def search_db(retriever, query):
  # Perform retrieval based on the query
  results = retriever.get_relevant_documents(query)

  # Process and return results (replace with your desired processing)
  processed_results = [doc.page_content for doc in results]
  return processed_results

# Example usage
filename = "text.txt"  # Replace with your actual filename
retriever = process_and_store(filename)

template = """Answer the following question based on this context as a branding expert helping content creators to grow and know more about their audiences:

{context}

Question: {question}
"""

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

prompt = ChatPromptTemplate.from_template(template)
rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

def chat(question):
    return rag_chain.invoke(question)

if __name__ == "__main__":
    print(chat("delete comment"))
    