from dotenv import load_dotenv
import os
from pydantic import BaseModel


class Config(BaseModel):
    def __init__(self) -> None:
        load_dotenv(override=False)
        self.__geminiApiKey = os.getenv("GEMINISECRETKEY")

    def getGeminiApiKey(self) -> str:
        return self.__geminiApiKey


if __name__ == "__main__":
    obj = Config()
    print(obj.getGeminiApiKey())