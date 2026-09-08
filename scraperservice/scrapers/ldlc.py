import json

from bs4 import BeautifulSoup
from pydantic import HttpUrl
import requests

from scrapers.base import HEADERS, ProductData, Scraper


class LDLCScraper(Scraper):

    def scrape(self, url: str) -> ProductData:
        response = requests.get(
            url,
            headers=HEADERS,
            timeout=10
        )
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")
        product = self._extract_product(soup)

        return ProductData(
            name=product["name"],
            price=float(product["offers"]["price"]),
            currency=product["offers"]["priceCurrency"],
            url=HttpUrl(url),
            retailer=product["offers"]["seller"]["name"]
        )

    def _extract_product(self, soup: BeautifulSoup) -> dict:
        script = soup.find(
            "script",
            type="application/ld+json"
        )

        if not script or not script.string:
            raise ValueError("No JSON-LD found")

        try:
            return json.loads(script.string)
        except json.JSONDecodeError as e:
            raise ValueError("JSON-LD found is invalid") from e