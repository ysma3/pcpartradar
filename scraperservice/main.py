from datetime import datetime, timezone
import sys

from pocketbase import create_price_history, get_active_products, update_product
from scrapers.ldlc import LDLCScraper


def scrape_manual(url: str):
    scraper = LDLCScraper()
    try:
        product = scraper.scrape(url)
        print(f"Name     : {product.name}")
        print(f"Price    : {product.price}")
        print(f"Currency : {product.currency}")
        print(f"Retailer : {product.retailer}")
        print(f"URL      : {product.url}")
    except Exception as e:
        print(f"Scraping failed: {e}")
        sys.exit(1)

def scrape_products():
    scraper = LDLCScraper()

    try:
        products = get_active_products()
    except Exception as e:
        print(f"Failed to retrieve products from PocketBase: {e}")
        sys.exit(1)

    print(f"Found {len(products)} active product(s)")

    for product in products:
        print()
        print(f"Scraping: {product['name']}")
        print(f"URL: {product['url']}")

        try:
            scraped = scraper.scrape(product["url"])
            print(f"Price: {scraped.price} {scraped.currency}")

            last_checked = datetime.now(timezone.utc).isoformat()

            create_price_history(
                product_id=product["id"],
                price=scraped.price
            )

            update_product(
                product_id=product["id"],
                price=scraped.price,
                last_checked=last_checked
            )

            print("Price history created")
            print("Product updated")

        except Exception as e:
            print(f"Scraping failed: {e}")

def main():
    if len(sys.argv) > 2:
        print("Usage: python main.py for automatic\n python main.py <url> for manual scrape")
        sys.exit(1)

    if len(sys.argv) == 2:
        scrape_manual(sys.argv[1])
    else:
        scrape_products()

if __name__ == "__main__":
    main()