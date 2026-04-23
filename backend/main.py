from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
import shutil
import uuid

app = FastAPI(title="D-SearchAi Local Backend MVP")

# CORS setup for local frontend testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
DOCS_DIR = os.path.join(os.path.dirname(__file__), "data", "docs")
os.makedirs(DOCS_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "D-SearchAi Backend is running locally"}

@app.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    department: str = Form(...),
    category: str = Form(...)
):
    """
    Recebe um arquivo PDF/DOCX do frontend, salva localmente e 
    simula o processamento na IA (extração de metadados).
    """
    # 1. Save file locally to ensure "data sovereignty"
    file_id = str(uuid.uuid4())[:8]
    safe_filename = f"{file_id}_{file.filename}"
    file_path = os.path.join(DOCS_DIR, safe_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # 2. Simulate AI Processing
    # Future: Here we would trigger LangChain/LlamaIndex to read the PDF and chunk it into ChromaDB
    simulated_tags = [category, "Indexação Automática", "RDC Local"]
    
    return {
        "status": "success",
        "file_id": file_id,
        "filename": file.filename,
        "department": department,
        "tags": simulated_tags,
        "message": "Documento processado e indexado localmente com sucesso."
    }

@app.get("/search")
def search_documents(query: str):
    """
    Simula uma busca semântica em um banco vetorial local.
    """
    # Future: Query ChromaDB with the user's query embedding
    return {
        "query": query,
        "results": [
            {
                "id": "POP-Qualidade",
                "score": 0.92,
                "text": "Simulação: O procedimento exige auditoria em 3 etapas."
            }
        ]
    }
