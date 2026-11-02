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
    src: "/assets/cases/jcimpresoras/hero.webp",
    alt: "Página principal de JC Impresoras y PC, con botón de cotización de soporte técnico por WhatsApp",
    width: 1908,
    height: 936,
    caption: "01 / Presencia digital · JC Impresoras y PC",
  },
  {
    src: "/assets/cases/jcimpresoras/formulario.webp",
    alt: "Formulario inteligente de cotización de JC Impresoras y PC con datos de contacto, mapa de ubicación y envío por WhatsApp",
    width: 1899,
    height: 943,
    caption: "02 / Formulario inteligente · Cotización automatizada por WhatsApp",
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

export function JcImpresorasCaseModal({ onClose, contactUrl }: {
  onClose: () => void;
  contactUrl: string;
}) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPortal>
        <DialogOverlay className="z-[100] bg-background/80 backdrop-blur-sm motion-reduce:animate-none" />
        <Content className="fixed left-1/2 top-1/2 z-[101] flex max-h-[92dvh] w-[calc(100%_-_2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-neon/30 bg-case-study text-case-study-foreground shadow-neon outline-none">
          <header className="relative shrink-0 border-b border-border px-5 py-5 md:px-8 md:py-6">
            <p className="pr-12 text-xs font-bold leading-relaxed text-neon">JC IMPRESORAS Y PC · CASO DE ÉXITO</p>
            <DialogTitle className="mt-3 pr-10 font-display text-xl font-extrabold leading-snug tracking-normal text-case-study-foreground md:text-3xl">
              Caso de Estudio: Plataforma de Captación Local &amp; Segmentación de Servicios
            </DialogTitle>
            <DialogDescription className="mt-2 pr-8 text-sm leading-relaxed text-case-study-foreground">
              Soporte Técnico Especializado e Impresión
            </DialogDescription>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Cerrar" className="absolute right-3 top-3 text-case-study-foreground hover:bg-neon/10 hover:text-neon md:right-5 md:top-5">
                <X aria-hidden="true" />
              </Button>
            </DialogClose>
          </header>

          <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-6 md:px-8 md:py-8">
            {screenshots.slice(0, 1).map((image) => <CaseScreenshot key={image.src} image={image} priority />)}

            <section className="mt-8 border-t border-border pt-6" aria-labelledby="jc-challenge">
              <h3 id="jc-challenge" className="font-display text-lg font-bold tracking-normal text-neon">El Desafío</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Los negocios de soporte técnico tradicional pierden valioso tiempo operativo respondiendo de forma manual preguntas repetitivas sobre tarifas o tipos de fallas, saturando sus canales sin segmentar los servicios más rentables.
              </p>
            </section>

            <section className="mt-7 border-t border-border pt-6" aria-labelledby="jc-solution">
              <h3 id="jc-solution" className="font-display text-lg font-bold tracking-normal text-neon">La Solución (Ingeniería de Software)</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Arquitectura y desarrollo de plataforma local estructurada estratégicamente en módulos independientes de soluciones (Hardware, Software e Impresión). Implementación de un sistema de derivación de solicitudes con un formulario inteligente de pre-selección que empaqueta los datos exactos del requerimiento del usuario, gatillando un flujo limpio de cotización automatizada hacia canales de mensajería instantánea.
              </p>
              <div className="mt-6 space-y-6">
                {screenshots.slice(1).map((image) => <CaseScreenshot key={image.src} image={image} />)}
              </div>
            </section>

            <section className="mt-8 border-l-2 border-neon bg-neon/5 px-5 py-5" aria-labelledby="jc-impact">
              <h3 id="jc-impact" className="font-display text-lg font-bold tracking-normal text-neon">Impacto y Valor High-Ticket</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Automatización del filtro inicial de prospección local y ordenamiento visual de la oferta técnica, maximizando la conversión de visitas en órdenes reales y reduciendo la fricción en el proceso de atención al cliente.
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
