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
    src: "/assets/cases/epaevoluzione/hero.webp",
    alt: "Página principal de EPA Evoluzione Antiusura con soluciones antidesgaste para la gran minería",
    width: 1920,
    height: 933,
    caption: "01 / Presencia corporativa · EPA Evoluzione Antiusura",
  },
  {
    src: "/assets/cases/epaevoluzione/bloque-cientifico.webp",
    alt: "Sección Conócenos de EPA con sus pilares: tribología de alto rendimiento, ajuste plug & play y suministro estratégico",
    width: 1920,
    height: 946,
    caption: "02 / Bloque técnico · Pilares de ingeniería de materiales",
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

export function EpaEvoluzioneCaseModal({ onClose, contactUrl }: {
  onClose: () => void;
  contactUrl: string;
}) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPortal>
        <DialogOverlay className="z-[100] bg-background/80 backdrop-blur-sm motion-reduce:animate-none" />
        <Content className="fixed left-1/2 top-1/2 z-[101] flex max-h-[92dvh] w-[calc(100%_-_2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-neon/30 bg-case-study text-case-study-foreground shadow-neon outline-none">
          <header className="relative shrink-0 border-b border-border px-5 py-5 md:px-8 md:py-6">
            <p className="pr-12 text-xs font-bold leading-relaxed text-neon">EPA EVOLUZIONE ANTIUSURA · CASO DE ÉXITO</p>
            <DialogTitle className="mt-3 pr-10 font-display text-xl font-extrabold leading-snug tracking-normal text-case-study-foreground md:text-3xl">
              Caso de Estudio: Presencia Corporativa e Ingeniería Web B2B
            </DialogTitle>
            <DialogDescription className="mt-2 pr-8 text-sm leading-relaxed text-case-study-foreground">
              Presencia Corporativa e Ingeniería Web B2B
            </DialogDescription>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Cerrar" className="absolute right-3 top-3 text-case-study-foreground hover:bg-neon/10 hover:text-neon md:right-5 md:top-5">
                <X aria-hidden="true" />
              </Button>
            </DialogClose>
          </header>

          <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-6 md:px-8 md:py-8">
            {screenshots.slice(0, 1).map((image) => <CaseScreenshot key={image.src} image={image} priority />)}

            <section className="mt-8 border-t border-border pt-6" aria-labelledby="epa-challenge">
              <h3 id="epa-challenge" className="font-display text-lg font-bold tracking-normal text-neon">El Desafío</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Los proveedores del sector industrial y de la gran minería necesitan proyectar una confianza técnica impecable y absoluta precisión estructural para ser considerados elegibles en procesos de licitación complejos y corporativos.
              </p>
            </section>

            <section className="mt-7 border-t border-border pt-6" aria-labelledby="epa-solution">
              <h3 id="epa-solution" className="font-display text-lg font-bold tracking-normal text-neon">La Solución (Ingeniería de Software)</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Arquitectura y desarrollo de una plataforma corporativa premium adaptada a los estándares exigentes de la industria pesada. Estructuración limpia del lenguaje de marca enfocado en soluciones tribológicas de alta resistencia, ingeniería de materiales y exposición clara de pilares fundamentales (Tribología de Alto Rendimiento, Ajuste Plug &amp; Play y Suministro Estratégico).
              </p>
              <div className="mt-6 space-y-6">
                {screenshots.slice(1).map((image) => <CaseScreenshot key={image.src} image={image} />)}
              </div>
            </section>

            <section className="mt-8 border-l-2 border-neon bg-neon/5 px-5 py-5" aria-labelledby="epa-impact">
              <h3 id="epa-impact" className="font-display text-lg font-bold tracking-normal text-neon">Impacto y Valor High-Ticket</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Posicionamiento digital de alto nivel que transforma la presencia de la empresa en un activo estratégico confiable frente a grandes compañías mineras, eliminando la informalidad visual y facilitando el contacto comercial B2B directo por canales institucionales.
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
