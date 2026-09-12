import { Card, CardActions, CardContent, Typography } from "@mui/material";
import type { Product } from "../api";
import { Link } from "react-router";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return <Card>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        {product.name}
      </Typography>
      <Typography variant="h5" component="div">

      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
        Prix actuel: {product.current_price} {product.currency}
      </Typography>
      <Typography variant="body2">
        Vendeur: {product.retailer}
      </Typography>
    </CardContent>
    <CardActions>
      <Link to={`/product/${product.id}`}><Typography color="primary">Voir l'historique du prix</Typography></Link>
    </CardActions>
  </Card>
}