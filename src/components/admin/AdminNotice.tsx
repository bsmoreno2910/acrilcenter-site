import { Alert, AlertTitle } from "@mui/material";

export default function AdminNotice() {
  return (
    <Alert severity="info" sx={{ borderRadius: 2 }}>
      <AlertTitle>Protecao no Cloudflare</AlertTitle>
      O caminho <strong>/admin</strong> e protegido por Basic Auth na Cloudflare Pages Function,
      usando as variaveis <strong>ADMIN_USER</strong> e <strong>ADMIN_PASSWORD</strong>.
    </Alert>
  );
}
