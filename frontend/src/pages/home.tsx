import { Box, CircularProgress, Grid, TextField } from "@mui/material"
import { fetchProducts, type Product } from "../api"
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import Layout from "./layout";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(res => setProducts(res.items))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <TextField
        fullWidth
        placeholder="Search a component..."
        sx={{ paddingBottom: 3 }}
      />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid key={product.id} size={{ xs: 12 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}