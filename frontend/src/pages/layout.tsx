import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "600" }}>
          <Link to="/">PCPartRadar</Link>
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          gutterBottom
        >
          Components price comparator
        </Typography>
        {children}
      </Box>
    </Container>
  );
}