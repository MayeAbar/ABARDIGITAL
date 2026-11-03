export interface MasterSolution {
  id: string;
  name: string;
  title: string;
  level: string;
  price: number;
  paymentUrl: string;
  mismatchedPaymentAmount?: number;
  permanent?: boolean;
  featured?: boolean;
  endorsement?: string;
  summary: string;
  details: string;
  inclusions: string[];
}

export const CHECKOUT_DELAY_MS = 1500;

// Explicit order and destinations are business data, not presentation logic.
export const masterSolutions: MasterSolution[] = [
  {
    id: "premium-ia",
    name: "Ecosistema Premium + Automatización IA (Nivel Pro)",
    title: "Ecosistema Premium + Automatización IA",
    level: "Nivel Pro",
    price: 320000,
    paymentUrl: "https://mpago.la/2dzfx5r",
    summary: "Un ecosistema exclusivo para marcas personales e infoproductores.",
    details: "Ecosistema digital exclusivo para marcas personales e infoproductores. Integración real de Checkout de Mercado Pago Chile, componentes modales interactivos y software a medida con agentes virtuales de IA integrados para automatización de contenidos y atención 24/7.",
    inclusions: ["Checkout real de Mercado Pago Chile y modales interactivos.", "Software a medida con agentes virtuales de IA.", "Automatización de contenidos y atención 24/7."],
  },
  {
    id: "portal-b2b",
    name: "Portal B2B Corporativo (Nivel Industria)",
    title: "Portal B2B Corporativo",
    level: "Nivel Industria",
    price: 280000,
    paymentUrl: "https://mpago.la/32FmewG",
    endorsement: "Respaldado por EPA Evoluzione",
    summary: "Presencia corporativa para proveedores industriales y grandes mineras.",
    details: "Arquitectura web multipágina corporativa de alto rendimiento diseñada para proveedores industriales que buscan postular exitosamente a licitaciones de grandes mineras. Incluye descarga optimizada de Fichas Técnicas en formato digital y optimización profesional de LinkedIn corporativo.",
    inclusions: ["Web corporativa multipágina de alto rendimiento.", "Fichas Técnicas digitales con descarga optimizada.", "Optimización profesional de LinkedIn corporativo."],
  },
  {
    id: "software-clinico",
    name: "Software Clínico & Gestión Médica Estética (Nivel Clínico)",
    title: "Software Clínico & Gestión Médica Estética",
    level: "Nivel Clínico",
    price: 249900,
    paymentUrl: "https://mpago.la/2TMah4Y",
    endorsement: "Respaldado por Aqua Viva Spa",
    summary: "Toda tu gestión clínica centralizada, sin mensualidades operativas.",
    details: "Sistema interno autoadministrable de historias clínicas digitales con almacenamiento seguro en la nube. Incluye módulos avanzados de consentimiento informado con firma digital y agendamiento interactivo de citas por calendario, libre de mensualidades operativas.",
    inclusions: ["Historias clínicas autoadministrables y nube segura.", "Consentimiento informado con firma digital.", "Agendamiento interactivo de citas por calendario."],
  },
  {
    id: "ventas-pro",
    name: "Sistema de Ventas Automatizado PRO (Más Vendido)",
    title: "Sistema de Ventas Automatizado PRO",
    level: "Más Vendido",
    price: 149900,
    paymentUrl: "https://mpago.la/2tjfinM",
    featured: true,
    summary: "Todo tu negocio digitalizado e interconectado para vender más.",
    details: "Todo tu negocio digitalizado e interconectado. Incluye el desarrollo de una Landing Page Pro de alta velocidad adaptada perfectamente a dispositivos móviles y PC, junto con la configuración de WhatsApp Profesional con respuestas instantáneas y atajos para preguntas frecuentes.",
    inclusions: ["Landing Page Pro de alta velocidad para móviles y PC.", "Configuración de WhatsApp Profesional.", "Respuestas instantáneas y atajos para preguntas frecuentes."],
  },
  {
    id: "presencia-total",
    name: "Pack Presencia Total Digital (Google + Redes)",
    title: "Pack Presencia Total Digital",
    level: "Google + Redes",
    price: 89900,
    paymentUrl: "https://mpago.la/2f5wJ6w",
    summary: "Posicionamiento local y conversión visual para destacar en tu zona.",
    details: "El paquete definitivo de posicionamiento local y conversión visual. Incluye la creación y optimización de tu ficha buscable en Google Business para captar clientes en tu zona, sumado a una reorganización estética estratégica del feed de Instagram y redes sociales.",
    inclusions: ["Creación y optimización de tu ficha en Google Business.", "Presencia buscable para captar clientes locales.", "Reorganización estética de Instagram y redes sociales."],
  },
  {
    id: "landing-lanzamiento",
    name: "Landing Page de Lanzamiento",
    title: "Landing Page de Lanzamiento",
    level: "Lanzamiento",
    price: 79900,
    paymentUrl: "https://mpago.la/1yqWGWq",
    summary: "Una página de alta conversión para lanzar tu producto o servicio.",
    details: "Landing Page profesional de alta velocidad, diseñada para presentar tu oferta, captar clientes y llevarlos directo a WhatsApp. Adaptada a móviles y PC.",
    inclusions: ["Diseño de alta conversión para tu lanzamiento.", "Adaptada a móviles y PC.", "Botón directo a WhatsApp."],
  },
  {
    id: "qr-kit-ia",
    name: "Código QR Profesional + Regalo Kit IA (Gancho de Entrada)",
    title: "Código QR Profesional + Regalo Kit IA",
    level: "Gancho de Entrada",
    price: 14900,
    paymentUrl: "https://mpago.la/1SiEY4T",
    permanent: true,
    summary: "Del mundo físico a tu negocio digital, con un Kit IA de regalo.",
    details: "Conecta el mundo físico con tu negocio digital en un segundo. QR corporativo permanente personalizado con tus colores que nunca vence y enlaces inteligentes editables. ¡Incluye de regalo un Kit de Prompts e instrucciones exactas para potenciar tu rubro comercial con Inteligencia Artificial!",
    inclusions: ["QR permanente con tus colores: nunca vence.", "Enlaces inteligentes editables.", "Kit de Prompts e instrucciones de IA para tu rubro, de regalo."],
  },
];

export const formatClp = (amount: number) => "$" + amount.toLocaleString("es-CL");

export const canConfirmPayment = (item: MasterSolution) => item.mismatchedPaymentAmount === undefined || item.mismatchedPaymentAmount === item.price;