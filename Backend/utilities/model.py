import requests
from shared.config import Config
from pydantic import BaseModel
from google import genai

class Aiclass

class AiModel(BaseModel):

    client : str | None = None
    setClient()

    @staticmethod
    def setClient() -> None:
        configObj = Config()
        client = genai.Client(api_key=configObj.getGeminiApiKey)

    def model_interaction