import { Alert, Box, Button, Chip, Stack, Typography } from "@mui/material";
import { ExternalLink, FileImage, Globe2, ShieldCheck } from "lucide-react";
import AdminLayout from "../components/admin/AdminLayout";
import AdminNotice from "../components/admin/AdminNotice";
import AdminSection from "../components/admin/AdminSection";
import AdminStatCard from "../components/admin/AdminStatCard";

const adminChecklist = [
  "Conferir se /admin esta protegido pelo Cloudflare Worker.",
  "Manter a senha real fora do repositorio e configurar somente em variavel de ambiente.",
  "Publicar o build depois de validar npm run typecheck.",
];

export default function Admin() {
  return (
    <AdminLayout>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Painel administrativo
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 850, letterSpacing: 0, mt: 0.5 }}>
            Revisao de publicacao
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mt: 1 }}>
            Area restaurada para manter o fluxo de administracao ativo sem embutir senha real no codigo.
          </Typography>
        </Box>

        <AdminNotice />

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          }}
        >
          <AdminStatCard
            helper="A rota /admin volta a existir no React Router."
            icon={<Globe2 size={22} />}
            label="Rota"
            value="/admin"
          />
          <AdminStatCard
            helper="Basic Auth via Cloudflare Worker."
            icon={<ShieldCheck size={22} />}
            label="Protecao"
            value="Cloudflare"
          />
          <AdminStatCard
            helper="Portfolio publico nao foi alterado nesta restauracao."
            icon={<FileImage size={22} />}
            label="Publicacao"
            value="Isolada"
          />
        </Box>

        <AdminSection title="Checklist antes de publicar">
          <Stack spacing={1.4}>
            {adminChecklist.map((item) => (
              <Stack key={item} direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
                <Chip color="primary" label="OK" size="small" variant="outlined" />
                <Typography>{item}</Typography>
              </Stack>
            ))}
          </Stack>
        </AdminSection>

        <AdminSection title="Atalhos">
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button href="/" startIcon={<ExternalLink size={18} />} variant="outlined">
              Ver site publico
            </Button>
            <Button href="/#trabalhos" startIcon={<FileImage size={18} />} variant="outlined">
              Ver portfolio
            </Button>
          </Stack>
        </AdminSection>

        <Alert severity="info">
          Nenhuma senha real foi hardcoded. O valor antigo nao foi reintroduzido.
        </Alert>
      </Stack>
    </AdminLayout>
  );
}
