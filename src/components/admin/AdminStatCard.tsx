import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

type AdminStatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
};

export default function AdminStatCard({ icon, label, value, helper }: AdminStatCardProps) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: 2,
        p: 2.5,
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            alignItems: "center",
            bgcolor: "rgba(14, 165, 233, 0.12)",
            borderRadius: 2,
            color: "primary.main",
            display: "flex",
            height: 42,
            justifyContent: "center",
            width: 42,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {value}
          </Typography>
        </Box>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {helper}
      </Typography>
    </Box>
  );
}
