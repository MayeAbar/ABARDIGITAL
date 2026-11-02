import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CreditCard, QrCode, Wallet } from "lucide-react";
import { AquaVivaCaseModal } from "@/components/aqua-viva-case-modal";
import { SoberanaCaseModal } from "@/components/soberana-case-modal";

const WA = "56934848427";
const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abar Digital — Sistemas de ventas en piloto automático" },
      { name: "description", content: "Landing pages veloces, códigos QR estratégicos y WhatsApp automatizado para emprendedores en Chile." },
      { property: "og:title", content: "Abar Digital — Ventas en piloto automático" },
      { property: "og:description", content: "Digitalizamos tu marca con landing pages, QR y automatizaciones de WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Logo({ size = 40 }: { size?: number }) {
  return (
    <a href="#" className="flex items-center gap-3">
      <img src="/images/logo.webp" alt="Abar Digital" width={size} height={size} className="rounded-lg object-cover" style={{ width: size, height: size }} />
      <span className="font-display text-lg font-bold">Abar <span className="text-gradient">Digital</span></span>
    </a>
  );
}

function Index() {
  return (
    <div className="bg-grid min-h-screen overflow-x-hidden">
      <header className="glass sticky top-0 z-50 !rounded-none !border-x-0 !border-t-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Logo />
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#roi" className="hover:text-foreground">Calculadora</a>
            <a href="#qr" className="hover:text-foreground">Simulador QR</a>
            <a href="#servicios" className="hover:text-foreground">Servicios</a>
          </nav>
        </div>
      </header>
      <Hero />
      <Roi />
      <Cases />
      <QrSim />
      <Services />
      <AvatarWidget />
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 md:flex-row">
          <Logo size={48} />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Abar Digital · abardigital.cl</p>
        </div>
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
      <div className="animate-rise">
        <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest text-neon">AGENCIA DE AUTOMATIZACIÓN · CHILE</span>
        <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
          Creamos Sistemas de Ventas en <span className="text-gradient">Piloto Automático</span> para Emprendedores
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Digitalizamos tu marca con landing pages de alta velocidad, códigos QR estratégicos y automatizaciones de WhatsApp que facturan mientras descansas.
        </p>
        <a href={wa("Hola Abar Digital, quiero automatizar mi negocio")} target="_blank" rel="noreferrer" className="btn-neon mt-10">
          Automatizar mi Negocio Ahora →
        </a>
      </div>
      <div className="animate-rise relative" style={{ animationDelay: ".2s" }}>
        <div className="absolute inset-6 rounded-full bg-gradient-neon opacity-20 blur-3xl" />
        <img src="/images/identidad_profesional.webp" alt="Antes y después de digitalizar tu negocio" className="glass relative mx-auto w-full max-w-md rounded-3xl p-2" />
      </div>
    </section>
  );
}

function Roi() {
  const [lost, setLost] = useState(5);
  const [ticket, setTicket] = useState(15000);
  const monthly = lost * ticket * 30;
  return (
    <section id="roi" className="mx-auto max-w-6xl px-5 py-16">
      <div className="glass rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-bold md:text-4xl">¿Cuánto dinero estás <span className="text-gradient">perdiendo</span>?</h2>
        <p className="mt-3 text-muted-foreground">Mueve el control: ventas perdidas al día por no responder rápido en redes.</p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="space-y-8">
            <label className="block">
              <div className="flex justify-between text-sm"><span>Ventas perdidas al día</span><b className="text-neon">{lost}</b></div>
              <input type="range" min={1} max={50} value={lost} onChange={(e) => setLost(+e.target.value)} className="neon-range mt-3 w-full" />
            </label>
            <label className="block">
              <div className="flex justify-between text-sm"><span>Ticket promedio</span><b className="text-cyan">{clp(ticket)}</b></div>
              <input type="range" min={5000} max={150000} step={5000} value={ticket} onChange={(e) => setTicket(+e.target.value)} className="neon-range mt-3 w-full" />
            </label>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-background/60 p-8 text-center">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Pérdida mensual estimada</span>
            <span className="mt-3 font-display text-4xl font-extrabold text-destructive md:text-5xl">{clp(monthly)}</span>
            <span className="mt-1 text-xs text-muted-foreground">CLP · 30 días</span>
            <a href={wa(`Hola, estoy perdiendo cerca de ${clp(monthly)} al mes. Quiero detener las pérdidas con Abar Digital.`)} target="_blank" rel="noreferrer" className="btn-neon mt-6 !py-3 text-sm">
              Detener mis pérdidas por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const cases = [
  {
    n: "01",
    t: "De Fragmentada a Soberana",
    s: "Plataforma Premium para Marcas Personales e Infoproductores",
    d: "Ecosistema digital con software a medida de automatización de contenidos, que transforma entradas de blog en guiones optimizados para Instagram y TikTok.",
    items: [
      "Ecosistema digital unificado para la marca personal.",
      "Software a medida que automatiza la producción de contenidos.",
      "Entradas de blog transformadas en guiones optimizados para Instagram y TikTok.",
      "Control total de la tecnología, sin depender de plataformas ajenas.",
    ],
  },
  {
    n: "02",
    t: "Aqua Viva Spa",
    s: "Medicina Estética & Bienestar / Gestión Clínica",
    d: "Ecosistema con software interno de historia clínica digital autoadministrable, firmas electrónicas y agendamiento en tiempo real en la nube.",
    items: [
      "Historia clínica digital autoadministrable por el propio equipo.",
      "Firmas electrónicas para consentimientos y documentos del paciente.",
      "Agendamiento de horas en tiempo real, alojado en la nube.",
      "Gestión clínica centralizada en un solo ecosistema.",
    ],
  },
  {
    n: "03",
    t: "EPA Evoluzione Antiusura",
    s: "Presencia Corporativa e Ingeniería Web B2B",
    d: "Arquitectura y desarrollo de plataforma corporativa para el sector industrial minero, optimizada para la exposición clara de soluciones tribológicas de alta resistencia y fichas de producto.",
    items: [
      "Arquitectura y desarrollo de plataforma corporativa B2B.",
      "Estructura de contenidos pensada para el sector industrial minero.",
      "Exposición clara de soluciones tribológicas de alta resistencia.",
      "Fichas de producto técnicas, ordenadas y fáciles de consultar.",
    ],
  },
  {
    n: "04",
    t: "JC Impresoras y PC",
    s: "Soporte Técnico Especializado e Impresión",
    d: "Plataforma local optimizada con flujos directos de cotización por WhatsApp y segmentación estratégica de servicios técnicos y software.",
    items: [
      "Plataforma local optimizada para clientes de la zona.",
      "Flujos directos de cotización por WhatsApp.",
      "Segmentación estratégica entre servicios técnicos y software.",
      "Presencia digital formal que ordena la oferta de servicios.",
    ],
  },
];

function Cases() {
  const [open, setOpen] = useState<(typeof cases)[number] | null>(null);
  return (
    <section id="casos" className="mx-auto max-w-6xl px-5 py-16">
      <span className="block text-center text-xs font-semibold uppercase tracking-[0.25em] text-neon">Casos de éxito</span>
      <h2 className="mt-4 text-center text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
        Proyectos que ya trabajan con <span className="text-gradient">nuestra tecnología</span>
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cases.map((c) => (
          <article key={c.n} className="group flex flex-col rounded-3xl border border-border bg-[var(--svc-card)] p-6 transition hover:-translate-y-1 hover:border-neon/50">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-cyan">Caso {c.n}</span>
              <span className="h-2 w-2 rounded-full bg-neon shadow-neon" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-lg font-extrabold text-[var(--svc-title)]">{c.t}</h3>
            <p className="mt-2 text-sm font-semibold text-[var(--svc-muted)]">{c.s}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--svc-text)]">{c.d}</p>
            <button type="button" onClick={() => setOpen(c)} className="case-cta mt-6 w-full">Ver Detalles</button>
          </article>
        ))}
      </div>
      {open && (open.n === "01"
        ? <SoberanaCaseModal onClose={() => setOpen(null)} contactUrl={wa(`Hola Abar Digital, vi el caso "${open.t}" y quiero un proyecto así para mi negocio.`)} />
        : open.n === "02"
        ? <AquaVivaCaseModal onClose={() => setOpen(null)} contactUrl={wa(`Hola Abar Digital, vi el caso "${open.t}" y quiero un proyecto así para mi negocio.`)} />
        : <CaseModal item={open} onClose={() => setOpen(null)} />)}
    </section>
  );
}

function CaseModal({ item, onClose }: { item: (typeof cases)[number]; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="case-title">
      <div onClick={(e) => e.stopPropagation()} className="animate-rise glass relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 md:p-8">
        <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border text-xl leading-none text-[var(--svc-text)] transition hover:border-neon/60 hover:text-neon">×</button>
        <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan">Caso de éxito · {item.n}</span>
        <h3 id="case-title" className="mt-3 pr-10 text-2xl font-extrabold text-[var(--svc-title)] md:text-3xl">{item.t}</h3>
        <p className="mt-2 text-sm font-semibold text-neon">{item.s}</p>
        <p className="mt-5 text-sm leading-relaxed text-[var(--svc-text)]">{item.d}</p>
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Qué incluye el proyecto</p>
        <ul className="mt-3 space-y-2 text-sm font-medium text-[var(--svc-text)]">
          {item.items.map((i) => <li key={i} className="flex gap-2"><span className="text-neon">✓</span><span>{i}</span></li>)}
        </ul>
        <a href={wa(`Hola Abar Digital, vi el caso "${item.t}" y quiero un proyecto así para mi negocio.`)} target="_blank" rel="noreferrer" className="btn-neon mt-8 !py-3 text-sm">
          Quiero un proyecto así →
        </a>
      </div>
    </div>
  );
}

function QrSim() {
  const [phase, setPhase] = useState<"idle" | "scan" | "chat">("idle");
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    if (phase === "scan") { const t = setTimeout(() => setPhase("chat"), 1200); return () => clearTimeout(t); }
    if (phase === "chat") { setTyping(true); const t = setTimeout(() => setTyping(false), 1000); return () => clearTimeout(t); }
    return undefined;
  }, [phase]);
  const start = () => phase === "idle" && setPhase("scan");
  return (
    <section id="qr" className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="text-center text-3xl font-bold md:text-4xl">Escanea y <span className="text-gradient">vende al instante</span></h2>
      <p className="mt-3 text-center text-muted-foreground">Pasa el cursor o toca el código QR para ver la magia.</p>
      <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
        <button onMouseEnter={start} onClick={start} className="glass mx-auto rounded-3xl p-6 transition hover:shadow-neon">
          <img src="/images/qr_web.webp" alt="Código QR Abar Digital" className="w-64 rounded-2xl bg-foreground p-3 md:w-80" />
          <span className="mt-4 block text-sm text-muted-foreground">{phase === "idle" ? "Toca para escanear" : <span role="link" onClick={(e) => { e.stopPropagation(); setPhase("idle"); }} className="cursor-pointer text-neon underline">Reiniciar</span>}</span>
        </button>
        <div className="mx-auto h-[520px] w-[270px] rounded-[2.75rem] border-4 border-secondary bg-background p-3 shadow-neon">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[2.1rem] bg-muted">
            {phase === "idle" && <div className="flex flex-1 items-center justify-center text-center text-sm text-muted-foreground">Esperando escaneo…</div>}
            {phase === "scan" && (
              <div className="relative flex-1 bg-background">
                <div className="absolute inset-10 rounded-xl border-2 border-cyan" />
                <div className="animate-scan absolute inset-x-10 h-0.5 bg-neon shadow-neon" />
                <p className="absolute bottom-6 w-full text-center text-xs text-cyan">Escaneando…</p>
              </div>
            )}
            {phase === "chat" && (
              <>
                <div className="flex items-center gap-2 bg-chat px-4 py-3">
                  <img src="/images/logo.webp" alt="" className="h-8 w-8 rounded-full object-cover" />
                  <div><p className="text-sm font-semibold">Abar Digital</p><p className="text-[10px] text-neon">{typing ? "escribiendo…" : "en línea"}</p></div>
                </div>
                <div className="flex-1 space-y-3 p-4 text-sm">
                  <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-none bg-chat px-3 py-2">Hola, vi su QR 👋</div>
                  {!typing && (
                    <div className="animate-rise w-fit max-w-[85%] rounded-2xl rounded-tl-none bg-secondary px-3 py-2">
                      ¡Hola! 🚀 Gracias por escribir a Abar Digital. Elige una opción:<br />1️⃣ Landing Page<br />2️⃣ WhatsApp Automatizado<br />3️⃣ Sistema Pro completo
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  { t: "Sistema de Ventas Automatizado PRO", p: 149900, mp: "https://mpago.la/2tjfinM", img: "/images/sistema_de_venta_automatizado_pro.webp", star: true, d: "Todo tu negocio digitalizado en un solo paquete integral. Te entregamos un ecosistema completo para vender en piloto automático.", items: ["Landing Page Pro adaptada a celulares y PC.", "1 Año de Hosting Gratis (sin mensualidades ni costos ocultos).", "WhatsApp Profesional con mensajes automáticos de bienvenida y ausencia.", "Código QR Estratégico para tu local o empaques."] },
  { t: "Landing Page de Lanzamiento", p: 79900, mp: "https://mpago.la/1yqWGWq", img: "/images/landing_page_de_lanzamiento.webp", d: "La forma más rápida y económica de tener presencia formal en internet y activar tus búsquedas locales en Google.", items: ["Web profesional de una sola página de alta velocidad.", "Incluye 1 año de dominio y hosting premium gratis.", "Cero mensualidades y cero costos ocultos de renovación.", "Botón con conexión directa y limpia a tu WhatsApp."] },
  { t: "WhatsApp Automatizado PRO", p: 49900, mp: "https://mpago.la/2TMah4Y", img: "/images/WhatsApp_Automatizado_PRO.webp", d: "Transformamos tu teléfono en un vendedor que trabaja 24/7 en piloto automático para que no dejes escapar clientes.", items: ["Respuestas instantáneas en 1 segundo para recibir a tus prospectos.", "Atajos de teclado instalados para contestar preguntas frecuentes.", "Sistema de etiquetas Pro por colores para controlar pedidos y pagos."] },
  { t: "Diseño de Identidad y Presencia Digital", p: 49900, mp: "https://mpago.la/2f5wJ6w", img: "/images/identidad_marca.webp", d: "Creamos la imagen visual de tu empresa desde cero para que dejes de usar plantillas genéricas o fotos borrosas.", items: ["Logotipo corporativo premium en alta resolución.", "Definición de tu paleta de colores estratégicos y tipografías de marca.", "Guía visual optimizada para profesionalizar el feed de tu Instagram y redes sociales."] },
  { t: "Código QR Profesional a Medida", p: 14900, mp: "https://mpago.la/2U7owwR", img: "/images/codigo_qr_a_medida.webp", contain: true, d: "Conecta el mundo físico con tu negocio digital en un segundo. Imprímelo en tus tarjetas, empaques o vitrinas.", items: ["QR corporativo permanente personalizado con tus colores (nunca vence).", "Diseño de letrero digital atractivo listo para imprenta o mostrador.", "Enlaces inteligentes editables que puedes redirigir cuando quieras."] },
  { t: "Pack de Prompts con IA para Negocios", p: 14900, mp: "https://mpago.la/1SiEY4T", img: "/images/pack_de_promt_con_ia_para_tu_negocio.webp", d: "Deja de adivinar qué escribirle a ChatGPT o Midjourney. Te entregamos la solución masticada y lista para usar.", items: ["Kit de instrucciones exactas (prompts) adaptadas 100% a tu rubro comercial.", "Fórmulas para generar imágenes de productos premium en un segundo.", "Plantillas de copiar y pegar para crear guiones de video y textos de venta."] },
];

function Services() {
  const [sel, setSel] = useState<{ t: string; p: number; mp: string } | null>(null);
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="text-center text-3xl font-extrabold md:text-4xl">Nuestros <span className="text-gradient">servicios</span></h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.t} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-[var(--svc-card)] transition hover:-translate-y-1">
            <div className={`relative aspect-[4/3] overflow-hidden ${s.contain ? "bg-[var(--svc-title)] p-6" : ""}`}>
              <img src={s.img} alt={s.t} loading="lazy" className={`h-full w-full transition duration-500 group-hover:scale-105 ${s.contain ? "object-contain" : "object-cover"}`} />
              {s.star && <span className="absolute right-4 top-4 rounded-full bg-[var(--svc-badge)] px-3 py-1 text-xs font-extrabold text-[var(--svc-cta-fg)]">MÁS VENDIDO</span>}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-extrabold text-[var(--svc-title)]">{s.t}</h3>
              <p className="mt-2 font-display text-3xl font-extrabold text-[var(--svc-title)]">{clp(s.p)}</p>
              <p className="mt-3 text-sm text-[var(--svc-text)]">{s.d}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm font-medium text-[var(--svc-text)]">
                {s.items.map((i) => <li key={i} className="flex gap-2"><span className="text-[var(--svc-cta)]">✓</span><span>{i}</span></li>)}
              </ul>
              <button type="button" onClick={() => setSel({ t: s.t, p: s.p, mp: s.mp })} className="svc-cta mt-6 w-full">Lo quiero</button>
            </div>
          </article>
        ))}
      </div>
      {sel && <CheckoutModal item={sel} onClose={() => setSel(null)} />}
    </section>
  );
}

function CheckoutModal({ item, onClose }: { item: { t: string; p: number; mp: string }; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => { clearTimeout(t); window.removeEventListener("keydown", k); };
  }, [onClose]);
  const methods = [
    { n: "Visa / Mastercard / Diners", Icon: CreditCard },
    { n: "Webpay / Redcompra", Icon: QrCode },
    { n: "Dinero en cuenta MP", Icon: Wallet },
  ];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true">
      <div onClick={(e) => e.stopPropagation()} className="animate-rise relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-[var(--mp-bg)] font-sans text-[var(--mp-ink)] shadow-2xl">
        <div className="flex items-center justify-between bg-[var(--mp-blue)] px-5 py-4">
          <div className="flex items-center gap-2 rounded-lg bg-[var(--mp-bg)] px-3 py-1.5 shadow-sm">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--mp-blue)] text-[11px] font-black leading-none text-[var(--mp-bg)]">mp</span>
            <span className="text-sm font-extrabold tracking-tight text-[var(--mp-blue)]">mercado pago</span>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-2xl leading-none text-[var(--mp-bg)]">×</button>
        </div>
        <div className="p-6">
          <h3 className="font-sans text-xl font-bold tracking-normal">Paga de forma segura con Mercado Pago</h3>
          <div className="mt-5 space-y-3 rounded-xl border border-[var(--mp-line)] bg-[var(--mp-surface)] p-4 text-sm">
            <div className="flex justify-between gap-4"><span className="text-[var(--mp-muted)]">Producto</span><span className="text-right font-semibold">{item.t}</span></div>
            <div className="flex justify-between border-t border-[var(--mp-line)] pt-3 text-base"><span className="font-semibold">Total a pagar</span><span className="font-extrabold">{clp(item.p)} CLP</span></div>
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-[var(--mp-muted)]">Medios de pago</p>
          <ul className="mt-2 divide-y divide-[var(--mp-line)] overflow-hidden rounded-xl border border-[var(--mp-line)]">
            {methods.map(({ n, Icon }) => (
              <li key={n} className="flex items-center gap-3 bg-[var(--mp-bg)] px-4 py-3 text-sm font-semibold">
                <Icon size={22} strokeWidth={1.8} className="shrink-0 text-[var(--mp-muted)]" aria-hidden="true" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-center gap-3 text-sm text-[var(--mp-muted)]">
            {loading ? (<><span className="h-6 w-6 animate-spin rounded-full border-[3px] border-[var(--mp-blue)] border-t-transparent" /> Procesando pago seguro…</>) : <span className="font-semibold text-[var(--mp-blue)]">✓ Checkout listo</span>}
          </div>
          <p className="mt-5 rounded-xl bg-[var(--mp-blue-soft)] p-4 text-center text-sm font-medium text-[var(--mp-ink)]">
            Al confirmar, se abrirá el checkout oficial de Mercado Pago en una pestaña nueva para completar tu pago con total seguridad.
          </p>
          <a href={item.mp} target="_blank" rel="noreferrer" aria-disabled={loading} onClick={loading ? (e) => e.preventDefault() : undefined}
            className={`mt-5 block rounded-lg bg-[var(--mp-blue)] py-3.5 text-center font-bold text-[var(--mp-bg)] transition hover:brightness-110 ${loading ? "pointer-events-none opacity-50" : ""}`}>
            Confirmar y pagar con Mercado Pago
          </a>
        </div>
      </div>
    </div>
  );
}

function AvatarWidget() {
  const [show, setShow] = useState(false);
  const timer = { current: 0 as unknown as ReturnType<typeof setTimeout> };
  return (
    <div className="fixed bottom-5 right-5 z-[90] flex items-center gap-3">
      <div className={`max-w-[220px] rounded-2xl border border-border bg-[var(--svc-card)] px-4 py-3 text-sm text-[var(--svc-title)] shadow-neon transition-all duration-300 sm:max-w-xs ${show ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-3 opacity-0"}`}>
        👋 Hablemos sobre tu negocio y llevémoslo al siguiente nivel
      </div>
      <a
        href={wa("Hola Patricia, vi tu avatar en la web y quiero asesoría para automatizar mi negocio.")}
        target="_blank" rel="noreferrer" aria-label="Hablar con Patricia por WhatsApp"
        onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
        onTouchStart={() => { timer.current = setTimeout(() => setShow(true), 350); }}
        onTouchEnd={() => { clearTimeout(timer.current); setTimeout(() => setShow(false), 2500); }}
        className="block h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full border-2 border-cyan shadow-neon transition hover:scale-105"
      >
        <img src="/images/avatar_patricia.jpg" alt="Patricia, asesora de Abar Digital" className="h-full w-full scale-125 object-cover" />
      </a>
    </div>
  );
}
