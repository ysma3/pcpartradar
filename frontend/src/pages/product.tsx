import { useParams } from "react-router";
import Layout from "./layout";
import { useEffect, useState } from "react";
import {
  fetchProduct,
  fetchPriceHistory,
  type Product,
  type PriceHistory,
} from "../api";
import { Typography, Box, CircularProgress } from "@mui/material";
import PriceChart from "../components/PriceChart";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();
  const [history, setHistory] = useState<PriceHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("no product");
      return;
    }

    Promise.all([
      fetchProduct(id),
      fetchPriceHistory(id),
    ])
      .then(([product, history]) => {
        setProduct(product);
        setHistory(history.items);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography variant="h4">
        {product?.name}
      </Typography>

      <Typography>
        {product?.current_price} {product?.currency} on{" "}
        {product?.retailer}
      </Typography>

      <a
        href={product?.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Voir le site
      </a>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Historique des prix
        </Typography>

        <PriceChart history={history} />
      </Box>
    </Layout>
  );
}