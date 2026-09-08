import os

import requests


POCKETBASE_URL = os.getenv(
    "POCKETBASE_URL",
    "http://127.0.0.1:8080"
)

POCKETBASE_TOKEN = os.getenv("POCKETBASE_TOKEN", "")

HEADERS = {
    "Authorization": POCKETBASE_TOKEN,
}

def get_active_products() -> list[dict]:
    response = requests.get(
        f"{POCKETBASE_URL}/api/collections/products/records",
        headers=HEADERS,
        params={
            "filter": "active = true",
        },
        timeout=10
    )
    response.raise_for_status()

    return response.json()["items"]

def create_price_history(product_id: str, price: float) -> None:
    response = requests.post(
        f"{POCKETBASE_URL}/api/collections/price_history/records",
        headers=HEADERS,
        json={
            "product": product_id,
            "price": price,
        },
        timeout=10
    )
    response.raise_for_status()

def update_product(
    product_id: str,
    price: float,
    last_checked: str,
) -> None:
    response = requests.patch(
        f"{POCKETBASE_URL}/api/collections/products/records/{product_id}",
        headers=HEADERS,
        json={
            "current_price": price,
            "last_checked": last_checked
        },
        timeout=10
    )
    response.raise_for_status()