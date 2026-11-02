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

export function AquaVivaCaseModal({
  onClose,
  contactUrl,
}: {
  onClose: () => void;
  contactUrl: string;
}) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPortal>
        <DialogOverlay className="z-[100] bg-background/80 backdrop-blur-sm motion-reduce:animate-none" />
        <Content className="fixed left-1/2 top-1/2 z-[101] flex max-h-[92dvh] w-[calc(100%_-_2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-neon/30 bg-background text-muted-foreground shadow-neon outline-none">
          <header className="relative shrink-0 border-b border-border px-5 py-5 md:px-8 md:py-6">
            <p className="pr-12 text-xs font-bold text-neon">AQUA VIVA SPA · CASO DE ÉXITO</p>
            <DialogTitle className="mt-3 pr-10 font-display text-2xl font-extrabold leading-snug tracking-normal text-foreground md:text-3xl">
              Caso de Estudio: Ecosistema Clínico Integrado
            </DialogTitle>
            <DialogDescription className="mt-2 pr-8 text-sm text-muted-foreground">
              Medicina Estética &amp; Bienestar / Gestión Clínica
            </DialogDescription>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Cerrar" className="absolute right-3 top-3 text-muted-foreground hover:bg-neon/10 hover:text-neon md:right-5 md:top-5">
                <X aria-hidden="true" />
              </Button>
            </DialogClose>
          </header>

          <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-6 md:px-8 md:py-8">
            <figure>
              <img
                src="/assets/cases/aquaviva/hero.png"
                alt="Página principal de Aqua Viva Spa, medicina estética y spa en Calama"
                width={1920}
                height={929}
                className="h-auto w-full rounded-lg border border-border"
              />
              <figcaption className="mt-3 text-xs text-muted-foreground">01 / Presencia digital · Aqua Viva Spa</figcaption>
            </figure>

            <section className="mt-8 border-t border-border pt-6" aria-labelledby="aqua-challenge">
              <h3 id="aqua-challenge" className="font-display text-lg font-bold tracking-normal text-neon">El Desafío</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                El centro de medicina estética gestionaba sus registros de pacientes de forma manual o fragmentada, arriesgando la pérdida de datos y enfrentando horas muertas debido a agendamientos ineficientes.
              </p>
            </section>

            <section className="mt-7 border-t border-border pt-6" aria-labelledby="aqua-solution">
              <h3 id="aqua-solution" className="font-display text-lg font-bold tracking-normal text-neon">La Solución (Ingeniería de Software)</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Desarrollo de una plataforma web médica con un software interno autoadministrable (/sistema-interno). Implementación de un backend seguro para el almacenamiento del historial clínico del cliente (antecedentes de salud, hábitos de vida y tratamientos), acompañado de un sistema visual interactivo de reserva de horas sincronizado en tiempo real.
              </p>
              <figure className="mt-6">
                <img
                  src="/assets/cases/aquaviva/agendamiento.png"
                  alt="Calendario visual de Aqua Viva Spa con selección de día, hora y servicio"
                  width={1904}
                  height={950}
                  loading="lazy"
                  className="h-auto w-full rounded-lg border border-border"
                />
                <figcaption className="mt-3 text-xs text-muted-foreground">02 / Agendamiento · Reserva visual de horas</figcaption>
              </figure>
              <figure className="mt-6">
                <img
                  src="/assets/cases/aquaviva/sistema-interno.png"
                  alt="Software interno de Aqua Viva Spa con antecedentes de salud, hábitos de vida y registro de tratamientos"
                  width={1559}
                  height={938}
                  loading="lazy"
                  className="h-auto w-full rounded-lg border border-border"
                />
                <figcaption className="mt-3 text-xs text-muted-foreground">03 / Sistema interno · Historia clínica digital</figcaption>
              </figure>
            </section>

            <section className="mt-8 border-l-2 border-neon bg-neon/5 px-5 py-5" aria-labelledby="aqua-impact">
              <h3 id="aqua-impact" className="font-display text-lg font-bold tracking-normal text-neon">Impacto y Valor High-Ticket</h3>
              <p className="mt-3 text-sm leading-7 md:text-base">
                Digitalización del 100% de la operación clínica bajo un formato seguro, escalable y con cero costos fijos mensuales de mantenimiento por licencias de terceros.
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