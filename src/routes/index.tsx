import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CreditCard, QrCode, Wallet } from "lucide-react";

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
  { t: "Sistema de Ventas Automatizado PRO", p: 149900, img: "/images/sistema_de_venta_automatizado_pro.webp", star: true, d: "Todo tu negocio digitalizado en un solo paquete integral. Te entregamos un ecosistema completo para vender en piloto automático.", items: ["Landing Page Pro adaptada a celulares y PC.", "1 Año de Hosting Gratis (sin mensualidades ni costos ocultos).", "WhatsApp Profesional con mensajes automáticos de bienvenida y ausencia.", "Código QR Estratégico para tu local o empaques."] },
  { t: "Landing Page de Lanzamiento", p: 79900, img: "/images/landing_page_de_lanzamiento.webp", d: "La forma más rápida y económica de tener presencia formal en internet y activar tus búsquedas locales en Google.", items: ["Web profesional de una sola página de alta velocidad.", "Incluye 1 año de dominio y hosting premium gratis.", "Cero mensualidades y cero costos ocultos de renovación.", "Botón con conexión directa y limpia a tu WhatsApp."] },
  { t: "WhatsApp Automatizado PRO", p: 49900, img: "/images/WhatsApp_Automatizado_PRO.webp", d: "Transformamos tu teléfono en un vendedor que trabaja 24/7 en piloto automático para que no dejes escapar clientes.", items: ["Respuestas instantáneas en 1 segundo para recibir a tus prospectos.", "Atajos de teclado instalados para contestar preguntas frecuentes.", "Sistema de etiquetas Pro por colores para controlar pedidos y pagos."] },
  { t: "Diseño de Identidad y Presencia Digital", p: 49900, img: "/images/identidad_marca.webp", d: "Creamos la imagen visual de tu empresa desde cero para que dejes de usar plantillas genéricas o fotos borrosas.", items: ["Logotipo corporativo premium en alta resolución.", "Definición de tu paleta de colores estratégicos y tipografías de marca.", "Guía visual optimizada para profesionalizar el feed de tu Instagram y redes sociales."] },
  { t: "Código QR Profesional a Medida", p: 14900, img: "/images/codigo_qr_a_medida.webp", contain: true, checkout: true, d: "Conecta el mundo físico con tu negocio digital en un segundo. Imprímelo en tus tarjetas, empaques o vitrinas.", items: ["QR corporativo permanente personalizado con tus colores (nunca vence).", "Diseño de letrero digital atractivo listo para imprenta o mostrador.", "Enlaces inteligentes editables que puedes redirigir cuando quieras."] },
  { t: "Pack de Prompts con IA para Negocios", p: 14900, img: "/images/pack_de_promt_con_ia_para_tu_negocio.webp", checkout: true, d: "Deja de adivinar qué escribirle a ChatGPT o Midjourney. Te entregamos la solución masticada y lista para usar.", items: ["Kit de instrucciones exactas (prompts) adaptadas 100% a tu rubro comercial.", "Fórmulas para generar imágenes de productos premium en un segundo.", "Plantillas de copiar y pegar para crear guiones de video y textos de venta."] },
];

function Services() {
  const [sel, setSel] = useState<{ t: string; p: number } | null>(null);
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
              {s.checkout ? (
                <button type="button" onClick={() => setSel({ t: s.t, p: s.p })} className="svc-cta mt-6 w-full">Lo quiero</button>
              ) : (
                <a href={wa(`Hola, me interesa: ${s.t} (${clp(s.p)})`)} target="_blank" rel="noreferrer" className="svc-cta mt-6">Lo quiero</a>
              )}
            </div>
          </article>
        ))}
      </div>
      {sel && <CheckoutModal item={sel} onClose={() => setSel(null)} />}
    </section>
  );
}

function CheckoutModal({ item, onClose }: { item: { t: string; p: number }; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => { clearTimeout(t); window.removeEventListener("keydown", k); };
  }, [onClose]);
  const isPack = item.t.startsWith("Pack");
  const product = isPack ? "Pack de Prompts IA - Abar Digital" : "Código QR Profesional";
  const short = isPack ? "Pack de Prompts" : "Código QR Profesional";
  const methods = [
    { n: "VISA", c: "text-[#1a1f71] italic" },
    { n: "Mastercard", c: "text-[#eb001b]" },
    { n: "Diners", c: "text-[#004a97]" },
    { n: "Webpay / Redcompra", c: "text-[var(--mp-ink)]" },
    { n: "Dinero en cuenta MP", c: "text-[var(--mp-blue)]" },
  ];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true">
      <div onClick={(e) => e.stopPropagation()} className="animate-rise relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-[var(--mp-bg)] font-sans text-[var(--mp-ink)] shadow-2xl">
        <div className="flex items-center justify-between bg-[var(--mp-blue)] px-5 py-4">
          <div className="flex items-center gap-2 rounded-full bg-[var(--mp-bg)] px-3 py-1.5 text-sm font-extrabold text-[var(--mp-blue)]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--mp-blue)] text-[10px] text-[var(--mp-bg)]">🤝</span>
            mercado pago
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-2xl leading-none text-[var(--mp-bg)]">×</button>
        </div>
        <div className="p-6">
          <h3 className="font-sans text-xl font-bold tracking-normal">Paga de forma segura con Mercado Pago</h3>
          <div className="mt-5 space-y-3 rounded-xl border border-[var(--mp-line)] bg-[var(--mp-surface)] p-4 text-sm">
            <div className="flex justify-between gap-4"><span className="text-[var(--mp-muted)]">Producto</span><span className="text-right font-semibold">{product}</span></div>
            <div className="flex justify-between border-t border-[var(--mp-line)] pt-3 text-base"><span className="font-semibold">Total a pagar</span><span className="font-extrabold">{clp(item.p)} CLP</span></div>
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-[var(--mp-muted)]">Medios de pago</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {methods.map((m) => (
              <span key={m.n} className={`rounded-md border border-[var(--mp-line)] bg-[var(--mp-bg)] px-2.5 py-1 text-xs font-extrabold ${m.c}`}>{m.n}</span>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-center gap-3 text-sm text-[var(--mp-muted)]">
            {loading ? (<><span className="h-6 w-6 animate-spin rounded-full border-[3px] border-[var(--mp-blue)] border-t-transparent" /> Procesando pago seguro…</>) : <span className="font-semibold text-[var(--mp-blue)]">✓ Pago validado</span>}
          </div>
          <p className="mt-5 rounded-xl bg-[var(--mp-blue-soft)] p-4 text-center text-sm font-medium text-[var(--mp-ink)]">
            ¡Prueba superada! Estás experimentando nuestro sistema de checkout automático en vivo. Tu negocio puede procesar ventas y recibir pagos con tarjeta exactamente igual que esto las 24 horas.
          </p>
          <a href={wa(`Hola Abar Digital, acabo de probar la demo del checkout en la web y quiero comprar el ${short} por ${clp(item.p)}.`)} target="_blank" rel="noreferrer" aria-disabled={loading}
            className={`mt-5 block rounded-lg bg-[var(--mp-blue)] py-3.5 text-center font-bold text-[var(--mp-bg)] transition hover:brightness-110 ${loading ? "pointer-events-none opacity-50" : ""}`}>
            Continuar a WhatsApp para recibir mi producto
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
