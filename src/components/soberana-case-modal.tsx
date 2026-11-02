import { Content } from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

// Public paths support any browser-compatible extension without URL rewriting.
const screenshots = [
  {
    src: "/assets/cases/soberana/hero.webp",
    alt: "Página principal de De Fragmentada a Soberana, el diario de Patricia Abar",
    width: 1920,
    height: 947,
    caption: "01 / Presencia digital · De Fragmentada a Soberana",
  },
  {
    src: "/assets/cases/soberana/ediciones.webp",
    alt: "Panel interno de ediciones de De Fragmentada a Soberana, con racha editorial y formulario de publicación para diario, TikTok e Instagram",
    width: 1903,
    height: 946,
    caption: "02 / Panel interno · Ediciones y publicación de contenidos",
  },
  {
    src: "/assets/cases/soberana/acceso-privado.webp",
    alt: "Área de acceso privado de De Fragmentada a Soberana con entrada mediante contraseña",
    width: 1916,
    height: 933,
    caption: "03 / Acceso privado · Área exclusiva de gestión",
  },
];

function CaseScreenshot({ image, priority = false }: {
  image: (typeof screenshots)[number];
  priority?: boolean;
}) {
  return (
    <figure>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full rounded-lg border border-border"
      />
      <figcaption className="mt-3 text-xs leading-relaxed text-case-study-foreground">{image.caption}</figcaption>
    </figure>
  );
}

export function SoberanaCaseModal({ onClose, contactUrl }: {
  onClose: () => void;
  contactUrl: string;
}) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPortal>
        <DialogOverlay className="z-[100] bg-background/80 backdrop-blur-sm motion-reduce:animate-none" />
        <Content className="fixed left-1/2 top-1/2 z-[101] flex max-h-[92dvh] w-[calc(100%_-_2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-neon/30 bg-case-study text-case-study-foreground shadow-neon outline-none">
          <header className="relative shrink-0 border-b border-border px-5 py-5 md:px-8 md:py-6">
            <p className="pr-12 text-xs font-bold leading-relaxed text-neon">DE FRAGMENTADA A SOBERANA · CASO DE ÉXITO</p>
            <DialogTitle className="mt-3 pr-10 font-display text-xl font-extrabold leading-snug tracking-normal text-case-study-foreground md:text-3xl">
              Caso de Estudio: Infraestructura de Contenidos &amp; Automatización con IA
            </DialogTitle>
            <DialogDescription className="mt-2 pr-8 text-sm leading-relaxed text-case-study-foreground">
              Plataforma Premium para Marcas Personales e Infoproductores
            </DialogDescription>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Cerrar" className="absolute right-3 top-3 text-case-study-foreground hover:bg-neon/10 hover:text-neon md:right-5 md:top-5">
                <X aria-hidden="true" />
              </Button>
            </DialogClose>
          </header>

          <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-6 md:px-8 md:py-8">
            {screenshots.slice(0, 1).map((image) => <CaseScreenshot key={image.src} image={image} priority />)}

            <section className="mt-8 border-t border-border pt-6" aria-labelledby="soberana-challenge">
              <h3 id="soberana-challenge" className="font-display text-lg font-bold tracking-normal text-neon">El Desafío</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Los infoproductores y creadores de contenido de alto nivel pierden decenas de horas semanales adaptando manualmente textos largos de blogs o cursos hacia formatos dinámicos para redes sociales (Instagram, TikTok), lo que fragmenta su foco operativo.
              </p>
            </section>

            <section className="mt-7 border-t border-border pt-6" aria-labelledby="soberana-solution">
              <h3 id="soberana-solution" className="font-display text-lg font-bold tracking-normal text-neon">La Solución (Ingeniería de Software)</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Desarrollo de un ecosistema web premium exclusivo para marcas personales que incorpora un área de autenticación restringida y segura. Implementación de una plataforma interna de gestión y automatización de contenidos con software a medida, capaz de procesar entradas extensas y transformarlas instantáneamente en guiones optimizados y estructurados para formatos de video corto (TikTok) y publicaciones de Instagram de manera centralizada.
              </p>
              <div className="mt-6 space-y-6">
                {screenshots.slice(1).map((image) => <CaseScreenshot key={image.src} image={image} />)}
              </div>
            </section>

            <section className="mt-8 border-l-2 border-neon bg-neon/5 px-5 py-5" aria-labelledby="soberana-impact">
              <h3 id="soberana-impact" className="font-display text-lg font-bold tracking-normal text-neon">Impacto y Valor High-Ticket</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Centralización absoluta de la estrategia digital en un solo panel de control personalizado, automatizando la distribución de contenidos y reduciendo los tiempos de preproducción en más de un 80% sin depender de costosas herramientas o suscripciones mensuales de terceros.
              </p>
            </section>

            <Button asChild size="lg" className="mt-7 h-auto min-h-11 w-full whitespace-normal py-3 font-bold sm:w-auto">
              <a href={contactUrl} target="_blank" rel="noreferrer">
                Quiero un proyecto así <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Content>
      </DialogPortal>
    </Dialog>
  );
}