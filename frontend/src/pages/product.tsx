import { useParams } from "react-router";
import Layout from "./layout";
import { useEffect, useState } from "react";
import { fetchProduct, type Product } from "../api";
import { Typography } from "@mui/material";

export default function ProductPage() {
  let { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (!id) {
      console.error("no product");
      return;
    }
    fetchProduct(id)
      .then(res => setProduct(res))
      .catch(e => console.error(e));
  }, []);

  return <Layout>
    <Typography variant="h4">{product?.name}</Typography>
    <Typography>{product?.current_price} {product?.currency} on {product?.retailer}</Typography>
    <a href={product?.url} target="_blank">Voir le site</a>
  </Layout>;
}