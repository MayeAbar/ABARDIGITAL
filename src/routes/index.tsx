import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const WA = "56900000000";
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
  { t: "Sistema de Ventas Automatizado PRO", p: 149900, img: "/images/sistema_de_venta_digital_pro.webp", pos: "center", items: ["Landing page", "Catálogo digital", "WhatsApp profesional instalado", "Código QR estratégico"], star: true },
  { t: "Landing Page de Lanzamiento", p: 79900, img: "/images/landing_page.webp", pos: "center", items: ["Web profesional", "1 año de hosting gratis", "Diseño de alta velocidad", "Conexión directa a WhatsApp"] },
  { t: "WhatsApp Automatizado PRO", p: 49900, img: "/images/sistema_de_venta_digital_pro.webp", pos: "78% 40%", zoom: true, items: ["Respuestas en 1 segundo", "Atajos para preguntas frecuentes", "Control de pedidos por colores"] },
  { t: "Identidad Profesional y Contenido", p: 49900, img: "/images/promt_web.webp", pos: "center 40%", items: ["Logotipos corporativos premium", "Prompts avanzados de IA", "Guiones y automatización de videos"] },
];

function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="text-center text-3xl font-bold md:text-4xl">Nuestros <span className="text-gradient">servicios</span></h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <article key={s.t} className="glass group flex flex-col overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:shadow-neon">
            <div className="relative h-56 overflow-hidden">
              <img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" style={{ objectPosition: s.pos, transform: s.zoom ? "scale(2.2)" : undefined }} />
              {s.star && <span className="absolute right-4 top-4 rounded-full bg-gradient-neon px-3 py-1 text-xs font-bold text-primary-foreground">MÁS VENDIDO</span>}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold">{s.t}</h3>
              <p className="mt-2 font-display text-3xl font-extrabold text-gradient">{clp(s.p)}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
                {s.items.map((i) => <li key={i}><span className="text-neon">✓</span> {i}</li>)}
              </ul>
              <a href={wa(`Hola, me interesa: ${s.t} (${clp(s.p)})`)} target="_blank" rel="noreferrer" className="mt-6 rounded-full border border-neon py-3 text-center text-sm font-semibold text-neon transition hover:bg-neon hover:text-primary-foreground">
                Lo quiero
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
