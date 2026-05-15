import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Fab,
  IconButton,
  Link,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { WEB3FORMS_ACCESS_KEY } from "./config";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

type Company = {
  email: string;
  cell: string;
  phones: string[];
  instagram: {
    handle: string;
    url: string;
  };
  address: {
    name: string;
    street: string;
    city: string;
  };
};

type NavItem = {
  href: `#${string}`;
  label: string;
};

type Service = {
  eyebrow: string;
  title: string;
  text: string;
  icon: ReactNode;
  image: string;
  alt: string;
};

type PortfolioItem = {
  image: string;
  title: string;
  tag: string;
  description: string;
  alt: string;
};

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ContactFormErrors = Pick<ContactFormValues, "name" | "email" | "message">;
type ContactFormField = keyof ContactFormValues;
type TouchedFields = Partial<Record<ContactFormField, boolean>>;

const contactFormFields = ["name", "email", "phone", "message"] as const;

function isContactFormField(field: string): field is ContactFormField {
  return (contactFormFields as readonly string[]).includes(field);
}

function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

const brand = {
  logoColor: "brand/acrilcenter/logo/acrilcenter-logo-horizontal-color.svg",
};

const company: Company = {
  email: "acrilico@acrilcenter.com.br",
  cell: "11 99709-8029",
  phones: ["11 2249-2307", "11 2249-2979"],
  instagram: {
    handle: "@acrilcenter.com.br",
    url: "https://www.instagram.com/acrilcenter.com.br/",
  },
  address: {
    name: "Acrilcenter Com. de Acrílico Ltda.",
    street: "Rua José Pereira da Silva, 48 - Parque Edu Chaves",
    city: "CEP 02236-030, São Paulo - SP",
  },
};

const navItems: NavItem[] = [
  { href: "#top", label: "Home" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#trabalhos", label: "Trabalhos" },
];

const services: Service[] = [
  {
    eyebrow: "PDV",
    title: "Displays e expositores",
    text: "Peças para vitrine, balcão, showrooms e pontos de venda com acabamento transparente e visual leve.",
    icon: <StorefrontOutlinedIcon />,
    image: "assets/work/work-12.webp",
    alt: "Displays e expositores em acrílico transparente para produtos.",
  },
  {
    eyebrow: "Sob medida",
    title: "Chapas, tubos e peças técnicas",
    text: "Cortes, formatos, suportes, bandejas, potes e componentes em acrílico para demandas específicas.",
    icon: <PrecisionManufacturingOutlinedIcon />,
    image: "assets/work/work-20.webp",
    alt: "Chapas, tubos e peças técnicas em acrílico.",
  },
  {
    eyebrow: "Proteção",
    title: "Caixas, urnas e barreiras",
    text: "Organização, proteção e separação para atendimento, lojas, escritórios, eventos e operações.",
    icon: <LayersOutlinedIcon />,
    image: "assets/work/work-08.webp",
    alt: "Caixas, urnas e barreiras em acrílico transparente.",
  },
  {
    eyebrow: "Presença",
    title: "Placas, púlpitos e troféus",
    text: "Itens institucionais, comunicação visual e peças de apresentação com brilho e leitura limpa.",
    icon: <ArrowForwardIcon />,
    image: "assets/work/work-19.webp",
    alt: "Troféus, placas e púlpito em acrílico transparente.",
  },
];

const portfolioItems: PortfolioItem[] = [
  {
    image: "assets/work/work-24.webp",
    title: "Piano de cauda em acrílico cristal",
    tag: "Cenografia premium",
    description: "Piano em acrílico transparente com iluminação LED nas pernas, fabricado para apresentações de palco.",
    alt: "Piano de cauda transparente em acrílico cristal com pernas iluminadas em LED.",
  },
  {
    image: "assets/work/work-23.webp",
    title: "Piano de cauda em acrílico no palco",
    tag: "Cenografia de palco",
    description: "Piano transparente em acrílico iluminado em palco de evento corporativo, com modelo em passarela.",
    alt: "Piano de cauda em acrílico cristal iluminado em palco de evento com luzes amarelas.",
  },
  {
    image: "assets/work/work-16.webp",
    title: "Fachada de casa noturna iluminada",
    tag: "Arquitetura comercial",
    description: "Fachada com painéis curvos em acrílico e iluminação LED em vermelho — projeto noturno de alto impacto.",
    alt: "Fachada de casa noturna com elementos em acrílico iluminados em vermelho.",
  },
  {
    image: "assets/work/work-12.webp",
    title: "Estande Itaipava em feira",
    tag: "Feiras",
    description: "Estande temático com vitrine de garrafas iluminada, comunicação visual e logo em diamante para feira do varejo.",
    alt: "Estande Itaipava em feira, com vitrine vermelha de garrafas e logo central.",
  },
  {
    image: "assets/work/work-17.webp",
    title: "Estande OX Science em feira",
    tag: "Feiras",
    description: "Estande de cosméticos com estrutura curva, iluminação em LED e acabamento dourado para feira do setor.",
    alt: "Estande OX Science com estrutura curva preta e dourada em ambiente de feira.",
  },
  {
    image: "assets/work/work-04.webp",
    title: "Parede de cubos para foto",
    tag: "Cenografia",
    description: "Parede de cubos coloridos com letreiro neon Hemp Vegan — composição cenográfica para ponto de foto em feira.",
    alt: "Parede de cubos coloridos com letreiro neon Hemp Vegan e poltrona Egg em frente.",
  },
  {
    image: "assets/work/work-01.webp",
    title: "Letreiro neon em formato de hambúrguer",
    tag: "Comunicação visual",
    description: "Letreiro em neon LED desenhado em formato de hambúrguer, em produção na fábrica antes da entrega.",
    alt: "Letreiro neon LED em formato de hambúrguer sendo produzido em bancada.",
  },
  {
    image: "assets/work/work-19.webp",
    title: "Letreiro Epic Games em acrílico iluminado",
    tag: "Comunicação visual",
    description: "Letreiro do logo Epic Games em acrílico com luz contínua, em ambiente de produção antes da entrega.",
    alt: "Letreiro Epic Games em acrílico iluminado sobre bancada de produção.",
  },
  {
    image: "assets/work/work-20.webp",
    title: "Estande Chlorum Solutions em feira",
    tag: "Feiras industriais",
    description: "Estande com painel iluminado em gota d'água, ambientação azul e mobiliário sob medida para feira do setor.",
    alt: "Estande Chlorum Solutions com painel iluminado em formato de gota d'água.",
  },
  {
    image: "assets/work/work-15.webp",
    title: "Portal BRB no tênis brasileiro",
    tag: "Eventos esportivos",
    description: "Portal de entrada de patrocinador BRB no Master de tênis brasileiro, com letreiros em LED azul.",
    alt: "Portal de entrada azul iluminado em LED com letreiros do BRB em evento de tênis.",
  },
  {
    image: "assets/work/work-14.webp",
    title: "Trono cenográfico com bolas de tênis Wilson",
    tag: "Visual merchandising",
    description: "Peça cenográfica em formato de trono coberto de bolas de tênis para vitrine de loja Wilson.",
    alt: "Trono cenográfico em forma de poltrona coberto de bolas de tênis amarelas em loja.",
  },
  {
    image: "assets/work/work-08.webp",
    title: "Mesa de centro em acrílico cristal",
    tag: "Mobiliário",
    description: "Mesa de centro em acrílico transparente para sala de estar — desenho contínuo, sem dobras visíveis.",
    alt: "Mesa de centro transparente em acrílico em sala de estar residencial.",
  },
  {
    image: "assets/work/work-10.webp",
    title: "Aparador longo em acrílico cristal",
    tag: "Mobiliário",
    description: "Aparador transparente para varanda envidraçada — leveza visual sem bloquear a vista.",
    alt: "Aparador longo transparente em acrílico próximo a janela com vista para a cidade.",
  },
  {
    image: "assets/work/work-03.webp",
    title: "Estande Hemp Vegan em feira",
    tag: "Feiras",
    description: "Estande com escultura central em formato de cogumelo, letreiro neon e displays digitais para feira do setor.",
    alt: "Estande Hemp Vegan com estrutura central em formato de cogumelo iluminado em feira.",
  },
  {
    image: "assets/work/work-05.webp",
    title: "Letreiro de fachada Hospital 4cats",
    tag: "Comunicação visual",
    description: "Letreiro luminoso para fachada de hospital veterinário, com símbolo do gato e tipografia em LED.",
    alt: "Letreiro luminoso Hospital 4cats em fachada noturna com símbolo de gato roxo.",
  },
  {
    image: "assets/work/work-09.webp",
    title: "Letreiro Simple em produção",
    tag: "Fabricação",
    description: "Letreiro luminoso da marca Simple sendo fabricado em bancada — etapa final antes da instalação.",
    alt: "Letreiro luminoso roxo escrito Simple sobre bancada de fabricação.",
  },
  {
    image: "assets/work/work-02.webp",
    title: "Brise de acrílico para sacada",
    tag: "Arquitetura",
    description: "Sistema de brises horizontais em acrílico cristal para sacada — proteção sem perder a vista.",
    alt: "Brise de acrílico instalado em sacada com vista para edifícios e céu de São Paulo.",
  },
  {
    image: "assets/work/work-06.webp",
    title: "Aparador com gaveteiro em acrílico",
    tag: "Mobiliário residencial",
    description: "Aparador transparente com gaveteiro em acrílico cristal para banheiro residencial de alto padrão.",
    alt: "Aparador em acrílico transparente com gaveteiro em banheiro com mármore marrom.",
  },
  {
    image: "assets/work/work-07.webp",
    title: "Cadeiras Jacobsen em acrílico",
    tag: "Mobiliário",
    description: "Conjunto de cadeiras em acrílico vermelho transparente com silhueta da Ant Chair de Arne Jacobsen, em sala de jantar.",
    alt: "Quatro cadeiras Jacobsen em acrílico vermelho em volta de mesa redonda.",
  },
  {
    image: "assets/work/work-11.webp",
    title: "Painel Amazon Evolution",
    tag: "Evento corporativo",
    description: "Painel cenográfico para evento Amazon Evolution, com parede de caixas iluminadas e letreiro suspenso.",
    alt: "Painel cenográfico Amazon Evolution com parede de caixas iluminadas em evento.",
  },
  {
    image: "assets/work/work-13.webp",
    title: "Letreiro neon #vemserPrack",
    tag: "Comunicação visual",
    description: "Letreiro neon em escrita cursiva para parede de tijolo aparente — ambientação institucional.",
    alt: "Letreiro neon em luz quente escrito #vem ser Prack sobre parede de tijolo aparente.",
  },
  {
    image: "assets/work/work-18.webp",
    title: "Logo Vertiv em ambiente corporativo",
    tag: "Comunicação visual",
    description: "Logo Vertiv iluminado para recepção corporativa, em painel preto com placa de troféu institucional abaixo.",
    alt: "Logo Vertiv iluminado em painel preto, com placa redonda dourada abaixo.",
  },
  {
    image: "assets/work/work-21.webp",
    title: "Cúpula em acrílico para amigurumi",
    tag: "Expositor",
    description: "Cúpula transparente em acrílico para proteger amigurumi de crochê — exposição com visibilidade total.",
    alt: "Cúpula transparente em acrílico protegendo amigurumi de crochê em formato de ursinho.",
  },
  {
    image: "assets/work/work-22.webp",
    title: "Instalação imersiva com cubos luminosos",
    tag: "Cenografia imersiva",
    description: "Instalação com dezenas de cubos luminosos suspensos em fios, criando ambiente sensorial em evento.",
    alt: "Instalação imersiva com cubos luminosos suspensos em fios sobre pedestais pretos.",
  },
];

const productKeywords = [
  "displays",
  "expositores",
  "chapas",
  "placas",
  "urnas",
  "caixas",
  "barreiras",
  "púlpitos",
  "troféus",
  "nichos",
  "cúpulas",
  "tubos",
];

const quoteEssentials = [
  "medidas",
  "quantidade",
  "cor do acrílico",
  "acabamento",
  "prazo",
];

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F6F8FB",
      paper: "#ffffff",
    },
    primary: {
      main: "#0EA5E9",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#6366F1",
    },
    success: {
      main: "#15803d",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#0B1220",
      secondary: "#475569",
    },
    divider: "rgba(15,23,42,0.08)",
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Inter", "Inter Display", "Segoe UI", system-ui, -apple-system, Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
      fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
      lineHeight: 1.12,
      fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)",
    },
    h3: {
      fontWeight: 650,
      letterSpacing: "-0.02em",
      lineHeight: 1.18,
      fontSize: "clamp(1.35rem, 2vw, 1.8rem)",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.015em",
      lineHeight: 1.22,
      fontSize: "1.2rem",
    },
    h5: {
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.55,
      fontSize: "1.05rem",
    },
    h6: {
      fontWeight: 650,
      letterSpacing: "-0.01em",
      lineHeight: 1.25,
      fontSize: "1.05rem",
    },
    subtitle1: {
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 1.35,
      fontSize: "1rem",
    },
    body1: {
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: 1.65,
      fontSize: "1rem",
    },
    body2: {
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: 1.6,
      fontSize: "0.93rem",
    },
    caption: {
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.35,
      fontSize: "0.78rem",
    },
    overline: {
      fontWeight: 700,
      letterSpacing: "0.16em",
      lineHeight: 1.4,
      fontSize: "0.72rem",
      textTransform: "uppercase",
    },
    button: {
      fontWeight: 600,
      letterSpacing: "-0.005em",
      textTransform: "none",
      fontSize: "0.95rem",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 999,
          paddingInline: 22,
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            background: "linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)",
            color: "#fff",
            boxShadow: "0 10px 30px rgba(14,165,233,0.28)",
            "&:hover": {
              background: "linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)",
              boxShadow: "0 14px 36px rgba(99,102,241,0.32)",
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: "1px solid rgba(15,23,42,0.07)",
          background: "#ffffff",
          boxShadow: "0 1px 0 rgba(15,23,42,0.04), 0 18px 48px -28px rgba(15,23,42,0.18)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const formatTel = (phone: string): string => `+55${phone.replace(/\D/g, "")}`;

function whatsappUrl(): string {
  const message = encodeURIComponent(
    "Olá, gostaria de pedir um orçamento com a Acrilcenter.",
  );
  return `https://wa.me/${formatTel(company.cell).replace(/\D/g, "")}?text=${message}`;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        borderRadius: 0,
        borderBottom: (scrolled || open) ? "1px solid rgba(15,23,42,0.08)" : "1px solid transparent",
        bgcolor: open ? "#ffffff" : scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
        color: "text.primary",
        boxShadow: "none",
        backdropFilter: !open && scrolled ? "blur(18px) saturate(1.2)" : "none",
        transition: "background-color 220ms ease, border-color 220ms ease, backdrop-filter 220ms ease",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 76 } }}>
          <Link
            href="#top"
            underline="none"
            color="inherit"
            sx={{ display: "flex", alignItems: "center", minWidth: 0 }}
          >
            <Box
              component="img"
              src={assetUrl(brand.logoColor)}
              alt="Acrilcenter"
              sx={{
                width: { xs: 180, sm: 210, md: 232 },
                height: { xs: 44, sm: 48, md: 52 },
                flex: "0 0 auto",
                display: "block",
                objectFit: "contain",
              }}
            />
          </Link>

          <Stack
            component="nav"
            direction="row"
            spacing={0.6}
            sx={{ ml: "auto", display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navItems.map((item) => (
              <Button
                key={item.href}
                color="inherit"
                href={item.href}
                onClick={item.href === "#top" ? (e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  if (window.history.replaceState) {
                    window.history.replaceState(null, "", window.location.pathname);
                  }
                } : undefined}
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  minHeight: 40,
                  px: 1.6,
                  "&:hover": { color: "text.primary", bgcolor: "rgba(15,23,42,0.05)" },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              href="#formulario"
              variant="contained"
              color="primary"
              sx={{ ml: 1.2, minHeight: 42 }}
            >
              Orçamento
            </Button>
            <Button
              href={company.instagram.url}
              target="_blank"
              rel="noreferrer"
              variant="text"
              color="inherit"
              startIcon={<InstagramIcon />}
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                minHeight: 40,
                px: 1.6,
                "&:hover": { color: "text.primary", bgcolor: "rgba(15,23,42,0.05)" },
              }}
            >
              Instagram
            </Button>
          </Stack>

          <IconButton
            color="inherit"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((current) => !current)}
            sx={{ ml: "auto", display: { xs: "inline-flex", md: "none" } }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        {open && (
          <Stack
            spacing={0.4}
            sx={{
              display: { xs: "flex", md: "none" },
              pb: 2.5,
              pt: 1.5,
              px: 1,
              mx: -1,
              color: "text.primary",
              bgcolor: "#ffffff",
              borderTop: "1px solid rgba(15,23,42,0.06)",
              boxShadow: "0 18px 36px -18px rgba(15,23,42,0.18)",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                color="inherit"
                onClick={(e) => {
                  if (item.href === "#top") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    if (window.history.replaceState) {
                      window.history.replaceState(null, "", window.location.pathname);
                    }
                  }
                  setOpen(false);
                }}
                sx={{ justifyContent: "flex-start", color: "text.secondary", fontWeight: 500, minHeight: 44 }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              href="#formulario"
              variant="contained"
              color="primary"
              onClick={() => setOpen(false)}
              startIcon={<SendOutlinedIcon />}
              sx={{ alignSelf: "flex-start", mt: 1, mx: 1 }}
            >
              Solicitar orçamento
            </Button>
            <Button
              href={company.instagram.url}
              target="_blank"
              rel="noreferrer"
              variant="text"
              color="inherit"
              onClick={() => setOpen(false)}
              startIcon={<InstagramIcon />}
              sx={{ justifyContent: "flex-start", color: "text.secondary", fontWeight: 500, minHeight: 44 }}
            >
              Instagram
            </Button>
          </Stack>
        )}
      </Container>
    </AppBar>
  );
}

const heroFeatureWorks = [
  { image: "assets/work/work-24.webp", tag: "Piano em acrílico cristal" },
  { image: "assets/work/work-04.webp", tag: "Cenografia luminosa" },
  { image: "assets/work/work-23.webp", tag: "Ativação noturna" },
  { image: "assets/work/work-15.webp", tag: "Estande esportivo" },
];

function Hero() {
  const featured = heroFeatureWorks[0];
  return (
    <Box
      id="top"
      component="section"
      className="hero-stage"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "#F6F8FB",
        minHeight: { xs: "auto", md: "100svh" },
        display: "flex",
        alignItems: "center",
        pt: { xs: 11, md: 14 },
        pb: { xs: 7, md: 10 },
      }}
    >
      <Box className="hero-orb hero-orb-cyan" aria-hidden="true" />
      <Box className="hero-orb hero-orb-violet" aria-hidden="true" />
      <Box className="hero-grid" aria-hidden="true" />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, px: { xs: 2.5, sm: 4, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" },
            alignItems: "center",
            gap: { xs: 5, md: 8 },
            minWidth: 0,
          }}
        >
          <Stack spacing={{ xs: 3, md: 3.4 }} sx={{ maxWidth: 620, minWidth: 0, width: "100%" }}>
            <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
              <Box className="hero-dot" />
              <Typography variant="overline" sx={{ color: "primary.main" }}>
                Acrílico sob medida · Brasil
              </Typography>
            </Stack>

            <Typography component="h1" variant="h1" sx={{ color: "text.primary", maxWidth: "100%", overflowWrap: "break-word" }}>
              30 anos transformando <Box component="span" className="hero-gradient-word">acrílicos</Box> em sonhos.
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                maxWidth: 540,
                width: "100%",
                overflowWrap: "break-word",
              }}
            >
              Fábrica própria em São Paulo, atendimento para todo o Brasil.
              Displays, expositores, peças técnicas, comunicação visual e
              projetos sob medida em acrílico.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.4} sx={{ pt: 0.5, minWidth: 0, width: "100%" }}>
              <Button
                href="#formulario"
                size="large"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: "100%" }}
              >
                Solicitar orçamento
              </Button>
              <Button
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                size="large"
                variant="text"
                startIcon={<WhatsAppIcon />}
                sx={{
                  color: "text.primary",
                  width: { xs: "100%", sm: "auto" },
                  maxWidth: "100%",
                  "&:hover": { bgcolor: "rgba(15,23,42,0.05)" },
                }}
              >
                Chamar no WhatsApp
              </Button>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1.4, sm: 3 }}
              sx={{ pt: { xs: 1, md: 2 }, color: "text.secondary" }}
              divider={
                <Box
                  sx={{
                    display: { xs: "none", sm: "block" },
                    width: "1px",
                    height: 24,
                    bgcolor: "rgba(15,23,42,0.12)",
                  }}
                />
              }
            >
              <Stack direction="row" spacing={1.1} sx={{ alignItems: "center" }}>
                <PrecisionManufacturingOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Fabricação própria em SP
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.1} sx={{ alignItems: "center" }}>
                <LocationOnOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Entrega para todo o Brasil
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.1} sx={{ alignItems: "center" }}>
                <LayersOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Projeto · corte · acabamento
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Box className="hero-showcase" sx={{ position: "relative", minWidth: 0, width: "100%" }}>
            <Box className="hero-showcase-card">
              <Box
                component="img"
                src={assetUrl(featured.image)}
                alt="Piano de cauda em acrílico cristal iluminado em palco."
                loading="eager"
                className="hero-showcase-image"
              />
              <Box className="hero-showcase-overlay" />
              <Box className="hero-showcase-label">
                <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.78)" }}>
                  {featured.tag}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


function ServicesSection() {
  return (
    <Box id="solucoes" component="section" sx={{ bgcolor: "background.default", pt: { xs: 6, md: 8 }, pb: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 5 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 2.5, md: 6 },
            alignItems: "end",
            mb: { xs: 5, md: 7 },
          }}
        >
          <Stack spacing={2}>
            <Typography variant="overline" color="primary.main">
              O que fazemos
            </Typography>
            <Typography variant="h2" sx={{ maxWidth: 540 }}>
              Do desenho à peça pronta!
            </Typography>
          </Stack>
          <Typography color="text.secondary" sx={{ fontSize: { xs: "1rem", md: "1.08rem" }, maxWidth: 520 }}>
            Produção sob medida para empresas de todo o Brasil: peças para
            expor, organizar, proteger e apresentar produtos com acabamento
            limpo e transparência real.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: { xs: 2, md: 2.4 },
          }}
        >
          {services.map((service) => (
            <Box key={service.title} className="service-card">
              <Box className="service-card-media">
                <Box
                  component="img"
                  src={assetUrl(service.image)}
                  alt={service.alt}
                  loading="lazy"
                />
              </Box>
              <Box className="service-card-body">
                <Box className="service-card-icon">{service.icon}</Box>
                <Typography variant="overline" color="text.secondary">
                  {service.eyebrow}
                </Typography>
                <Typography variant="h6" sx={{ mt: 0.6, mb: 1.2, fontWeight: 650 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                  {service.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box className="keyword-ribbon" sx={{ mt: { xs: 3, md: 4 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ mr: 1.4 }}>
            Catálogo:
          </Typography>
          {productKeywords.map((item) => (
            <Box key={item} className="keyword-chip">
              {item}
            </Box>
          ))}
        </Box>

        <Box className="quote-strip">
          <Stack spacing={1.6} sx={{ maxWidth: 460 }}>
            <Typography variant="overline" sx={{ color: "rgba(186,230,253,0.92)" }}>
              Para orçar melhor
            </Typography>
            <Typography variant="h3" sx={{ color: "#fff" }}>
              Passe o essencial. A gente transforma em peça.
            </Typography>
            <Typography sx={{ color: "rgba(226,232,240,0.78)", lineHeight: 1.65 }}>
              Quanto mais claro o pedido, mais ágil o orçamento. Compartilhe os
              5 pontos abaixo e a gente já volta com proposta.
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.2 }}>
            {quoteEssentials.map((item, index) => (
              <Box key={item} className="quote-token">
                <Box component="span" className="quote-token-index">
                  {String(index + 1).padStart(2, "0")}
                </Box>
                <Box component="span">{item}</Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function WorksCarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeItem = portfolioItems[activeIndex];

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % portfolioItems.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [paused]);

  const previous = (): void => {
    setActiveIndex((current) => (current === 0 ? portfolioItems.length - 1 : current - 1));
  };

  const next = (): void => {
    setActiveIndex((current) => (current + 1) % portfolioItems.length);
  };

  return (
    <Box
      id="trabalhos"
      component="section"
      className="portfolio-section"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "#0B1220",
        pt: { xs: 6, md: 8 },
        pb: { xs: 7, md: 10 },
        color: "#fff",
      }}
    >
      <Box className="portfolio-ambient" aria-hidden="true" />
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 2.5, md: 6 },
            alignItems: "end",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
              <Box className="section-icon-dark">
                <PhotoLibraryOutlinedIcon fontSize="small" />
              </Box>
              <Typography variant="overline" sx={{ color: "#7DD3FC" }}>
                Trabalhos realizados
              </Typography>
            </Stack>
            <Typography variant="h2" sx={{ color: "#fff", maxWidth: 540 }}>
              Foi a gente que fez.
            </Typography>
          </Stack>
          <Typography sx={{ color: "rgba(226,232,240,0.74)", maxWidth: 520, fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.7 }}>
            Pianos transparentes, cadeiras de design, estandes, fachadas,
            mobiliário e comunicação visual — entregues para empresas em
            todo o Brasil.
          </Typography>
        </Box>

        <Box
          className="portfolio-shell"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Box className="portfolio-visual">
            <Box
              component="img"
              key={`bg-${activeItem.image}`}
              className="portfolio-bg-image"
              src={assetUrl(activeItem.image)}
              alt=""
              aria-hidden="true"
              loading={activeIndex === 0 ? "eager" : "lazy"}
            />
            <Box
              component="img"
              key={activeItem.image}
              className="portfolio-main-image"
              src={assetUrl(activeItem.image)}
              alt={activeItem.alt}
              loading={activeIndex === 0 ? "eager" : "lazy"}
            />
            <Box className="portfolio-progress" aria-hidden="true">
              <Box
                className="portfolio-progress-bar"
                key={`${activeIndex}-${paused}`}
                sx={{ animationPlayState: paused ? "paused" : "running" }}
              />
            </Box>
            <Stack direction="row" spacing={1} className="portfolio-controls">
              <IconButton aria-label="Imagem anterior" onClick={previous} className="portfolio-control">
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="overline" className="portfolio-counter">
                {String(activeIndex + 1).padStart(2, "0")}
                <Box component="span" sx={{ opacity: 0.5, mx: 0.5 }}>/</Box>
                {String(portfolioItems.length).padStart(2, "0")}
              </Typography>
              <IconButton aria-label="Próxima imagem" onClick={next} className="portfolio-control">
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </Box>

          <Box className="portfolio-copy">
            <Stack spacing={2.4} sx={{ height: "100%", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="overline" sx={{ color: "#7DD3FC" }}>
                  {activeItem.tag}
                </Typography>
                <Typography variant="h3" sx={{ color: "#fff", mt: 0.8 }}>
                  {activeItem.title}
                </Typography>
                <Typography sx={{ color: "rgba(226,232,240,0.74)", lineHeight: 1.7, mt: 2 }}>
                  {activeItem.description}
                </Typography>
              </Box>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.4}>
                <Button href="#formulario" variant="contained" endIcon={<ArrowForwardIcon />}>
                  Quero algo assim
                </Button>
                <Button
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  variant="text"
                  startIcon={<WhatsAppIcon />}
                  sx={{
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                  }}
                >
                  Pedir orçamento
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box className="portfolio-thumbs" aria-label="Selecionar trabalho realizado">
          {portfolioItems.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className={`portfolio-thumb${index === activeIndex ? " is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver trabalho: ${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <img src={assetUrl(item.image)} alt="" loading="lazy" />
            </button>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

type SubmitState = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [form, setForm] = useState<ContactFormValues>({ name: "", email: "", phone: "", message: "" });
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<string>("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const errors = useMemo<ContactFormErrors>(
    () => ({
      name: form.name.trim() ? "" : "Informe seu nome.",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? ""
        : "Informe um e-mail válido.",
      message: form.message.trim() ? "" : "Descreva sua necessidade.",
    }),
    [form],
  );

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    if (!isContactFormField(name)) {
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  };

  const markTouched = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (!isContactFormField(event.target.name)) {
      return;
    }

    setTouched((current) => ({ ...current, [event.target.name]: true }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const submittedForm = new FormData(event.currentTarget);
    if (submittedForm.get("botcheck")) {
      return;
    }

    const invalid = Object.entries(errors).some(([, error]) => error);

    if (invalid) {
      setTouched({ name: true, email: true, message: true });
      setStatus("Preencha os campos obrigatórios para enviar a mensagem.");
      setSubmitState("error");
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setSubmitState("error");
      setStatus(
        "O formulário está indisponível no momento. Fale direto pelo WhatsApp ou e-mail.",
      );
      return;
    }

    setSubmitState("sending");
    setStatus("Enviando sua mensagem…");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: "Site Acrilcenter",
          subject: `Contato pelo site — ${form.name.trim()}`,
          replyto: form.email.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || "Não informado",
          message: form.message.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setSubmitState("success");
        setStatus("Mensagem enviada! Retornamos no mesmo dia útil.");
        setForm({ name: "", email: "", phone: "", message: "" });
        setTouched({});
      } else {
        throw new Error(data?.message || "Falha no envio.");
      }
    } catch {
      setSubmitState("error");
      setStatus(
        "Não conseguimos enviar pelo site. Tente novamente ou fale com a gente direto no WhatsApp.",
      );
    }
  };

  const invalid = (field: keyof ContactFormErrors): boolean => Boolean(touched[field] && errors[field]);
  const isSending = submitState === "sending";

  return (
    <Box component="form" onSubmit={submit} noValidate className="form-card">
      <input
        aria-hidden="true"
        autoComplete="off"
        className="form-honeypot"
        name="botcheck"
        tabIndex={-1}
        type="text"
      />
      <Stack spacing={2.4}>
        <Box>
          <Typography variant="overline" color="primary.main">
            Orçamento
          </Typography>
          <Typography variant="h3" sx={{ mt: 0.5 }}>
            Conte o que precisa.
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.2 }}>
            Envie medidas, quantidade, cor e prazo. Respondemos no mesmo dia útil.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1.8,
          }}
        >
          <TextField
            label="Nome"
            name="name"
            value={form.name}
            onChange={updateField}
            onBlur={markTouched}
            error={invalid("name")}
            helperText={invalid("name") ? errors.name : ""}
            fullWidth
          />
          <TextField
            label="E-mail"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            onBlur={markTouched}
            error={invalid("email")}
            helperText={invalid("email") ? errors.email : ""}
            fullWidth
          />
        </Box>
        <TextField
          label="Telefone (opcional)"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={updateField}
          onBlur={markTouched}
          fullWidth
        />
        <TextField
          label="Mensagem"
          name="message"
          value={form.message}
          onChange={updateField}
          onBlur={markTouched}
          error={invalid("message")}
          helperText={invalid("message") ? errors.message : "Ex.: medidas, quantidade, cor e prazo."}
          multiline
          minRows={5}
          fullWidth
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.4}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={isSending ? <CircularProgress size={18} color="inherit" /> : <SendOutlinedIcon />}
            disabled={isSending}
          >
            {isSending ? "Enviando…" : "Enviar mensagem"}
          </Button>
          <Button
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            size="large"
            color="success"
            startIcon={<WhatsAppIcon />}
            sx={{ borderRadius: 999 }}
          >
            Orçar pelo WhatsApp
          </Button>
        </Stack>
        {status && submitState === "success" && (
          <Alert severity="success" role="status">{status}</Alert>
        )}
        {status && submitState === "error" && (
          <Alert severity="error" role="alert">{status}</Alert>
        )}
        {status && submitState === "sending" && (
          <Alert severity="info" role="status">{status}</Alert>
        )}
      </Stack>
    </Box>
  );
}

function BusinessSection() {
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Rua%20Jos%C3%A9%20Pereira%20da%20Silva%2048%20Parque%20Edu%20Chaves%20S%C3%A3o%20Paulo%20SP";

  return (
    <Box id="formulario" component="section" sx={{ bgcolor: "background.default", pt: { xs: 6, md: 8 }, pb: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 5 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" },
            gap: { xs: 3, md: 4 },
            alignItems: "stretch",
          }}
        >
          <Box className="address-panel">
            <Box className="address-panel-decor" aria-hidden="true" />
            <Stack spacing={2.4} sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="overline" sx={{ color: "#7DD3FC" }}>
                Base em São Paulo · Atendimento Brasil
              </Typography>
              <Typography variant="h3" sx={{ color: "#fff" }}>
                Fale com quem fabrica.
              </Typography>
              <Typography sx={{ color: "rgba(226,232,240,0.74)", lineHeight: 1.7 }}>
                Sem intermediários: você fala direto com a fábrica em São
                Paulo. Atendimento para empresas, profissionais e projetos sob
                medida em todo o Brasil.
              </Typography>

              <Box
                sx={{
                  pt: 1,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="overline" sx={{ color: "rgba(226,232,240,0.5)", display: "block" }}>
                    Celular · WhatsApp
                  </Typography>
                  <Link
                    href={`tel:${formatTel(company.cell)}`}
                    sx={{ color: "#fff", fontWeight: 500, textDecoration: "none", "&:hover": { color: "#7DD3FC" } }}
                  >
                    {company.cell}
                  </Link>
                </Box>
                <Box>
                  <Typography variant="overline" sx={{ color: "rgba(226,232,240,0.5)", display: "block" }}>
                    E-mail
                  </Typography>
                  <Link
                    href={`mailto:${company.email}`}
                    sx={{ color: "#fff", fontWeight: 500, textDecoration: "none", "&:hover": { color: "#7DD3FC" } }}
                  >
                    {company.email}
                  </Link>
                </Box>
                <Box>
                  <Typography variant="overline" sx={{ color: "rgba(226,232,240,0.5)", display: "block" }}>
                    Instagram
                  </Typography>
                  <Link
                    href={company.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    sx={{ color: "#fff", fontWeight: 500, textDecoration: "none", "&:hover": { color: "#7DD3FC" } }}
                  >
                    {company.instagram.handle}
                  </Link>
                </Box>
                <Box sx={{ gridColumn: { xs: "auto", sm: "1 / -1" } }}>
                  <Typography variant="overline" sx={{ color: "rgba(226,232,240,0.5)", display: "block" }}>
                    Telefones fixos
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 1 }}>
                    {company.phones.map((phone) => (
                      <Link
                        key={phone}
                        href={`tel:${formatTel(phone)}`}
                        sx={{ color: "#fff", fontWeight: 500, textDecoration: "none", "&:hover": { color: "#7DD3FC" } }}
                      >
                        {phone}
                      </Link>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Stack>

            <Stack spacing={2.2} sx={{ position: "relative", zIndex: 1, mt: 4 }}>
              <Box className="address-divider" />
              <Box>
                <Typography sx={{ color: "#fff", fontWeight: 600 }}>{company.address.name}</Typography>
                <Typography sx={{ color: "rgba(226,232,240,0.72)", mt: 0.6 }}>{company.address.street}</Typography>
                <Typography sx={{ color: "rgba(226,232,240,0.72)" }}>{company.address.city}</Typography>
              </Box>
              <Button
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                variant="contained"
                startIcon={<LocationOnOutlinedIcon />}
                sx={{ alignSelf: "flex-start", whiteSpace: "nowrap" }}
              >
                Ver no mapa
              </Button>
            </Stack>
          </Box>
          <ContactForm />
        </Box>
      </Container>
    </Box>
  );
}

function FloatingWhatsApp() {
  return (
    <Fab
      variant="extended"
      color="success"
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Pedir um orçamento pelo WhatsApp"
      className="floating-whatsapp"
      sx={{
        position: "fixed",
        right: { xs: "16px", md: "24px" },
        bottom: { xs: "16px", md: "24px" },
        zIndex: 40,
        height: { xs: 54, md: 56 },
        minWidth: { xs: 54, md: "auto" },
        px: { xs: 0, md: 2.4 },
        borderRadius: 999,
        boxShadow: "0 12px 36px rgba(21,128,61,0.32)",
        textTransform: "none",
        fontWeight: 600,
      }}
    >
      <WhatsAppIcon sx={{ mr: { xs: 0, md: 1.1 } }} />
      <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
        Falar no WhatsApp
      </Box>
    </Fab>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0B1220",
        color: "rgba(226,232,240,0.7)",
        py: { xs: 4, md: 5 },
        mb: { xs: 9, md: 0 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 5 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
            gap: { xs: 2, md: 4 },
            alignItems: "center",
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2 }} sx={{ alignItems: { sm: "center" } }}>
            <Box
              component="img"
              src={assetUrl("brand/acrilcenter/logo/acrilcenter-logo-horizontal-white.svg")}
              alt="Acrilcenter"
              sx={{ height: 32, width: "auto" }}
            />
            <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.55)" }}>
              © {year} {company.address.name}
            </Typography>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 3 }}>
            <Link href={company.instagram.url} target="_blank" rel="noreferrer" color="inherit" underline="hover" sx={{ fontSize: "0.93rem" }}>
              Instagram
            </Link>
            <Link href={`mailto:${company.email}`} color="inherit" underline="hover" sx={{ fontSize: "0.93rem" }}>
              {company.email}
            </Link>
            <Link href={`tel:${formatTel(company.cell)}`} color="inherit" underline="hover" sx={{ fontSize: "0.93rem" }}>
              {company.cell}
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Header />
        <main>
          <Hero />
          <ServicesSection />
          <WorksCarouselSection />
          <BusinessSection />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </Box>
    </ThemeProvider>
  );
}
