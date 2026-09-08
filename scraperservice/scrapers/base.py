from abc import ABC, abstractmethod

from pydantic import BaseModel, HttpUrl

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36"
}

class ProductData(BaseModel):
    name: str
    price: float
    currency: str
    url: HttpUrl
    retailer: str

class Scraper(ABC):
    @abstractmethod
    def scrape(self, url: str) -> ProductData:
        raise NotImplementedError