import { Alert, Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { checkAPI } from "../api";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [apiHealth, setApiHealth] = useState<boolean | null>(null);

  useEffect(() => {
    checkAPI().then(setApiHealth);
  }, []);

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
        {apiHealth === null && <CircularProgress />}
        {apiHealth === false && (
          <Alert severity="error">
            API is unavailable
          </Alert>
        )}
        {apiHealth === true && children}
      </Box>
    </Container>
  );
}