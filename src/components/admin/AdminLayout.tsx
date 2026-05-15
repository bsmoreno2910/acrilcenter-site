import type { ReactNode } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { ExternalLink } from "lucide-react";

const adminTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#0EA5E9",
    },
    text: {
      primary: "#0B1220",
      secondary: "#526173",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, Arial, sans-serif',
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
});

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const logout = (): void => {
    window.location.assign("/");
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Box
          component="header"
          sx={{
            bgcolor: "#FFFFFF",
            borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", justifyContent: "space-between", minHeight: 72 }}
            >
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Acrilcenter
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Admin
                </Typography>
              </Box>
              <Button
                color="inherit"
                onClick={logout}
                startIcon={<ExternalLink size={18} />}
                variant="outlined"
              >
                Ver site
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
