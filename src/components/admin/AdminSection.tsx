import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

type AdminSectionProps = {
  children: ReactNode;
  title: string;
};

export default function AdminSection({ children, title }: AdminSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.paper",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: 2,
        p: { xs: 2.25, md: 3 },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
