from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import model
from .database import engine

model.Base.metadata.create_all(bind=engine)


app = FastAPI()

origins = ["http://localhost:5173", "https://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
