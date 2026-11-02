import { ArrowUpRight, Bot, Check, Factory, Gift, MapPin, QrCode, ShieldCheck, ShoppingBag } from "lucide-react";
import { useRef, useState } from "react";

import { ServiceCheckout } from "@/components/service-checkout";
import { Button } from "@/components/ui/button";
import { formatClp, masterSolutions, type MasterSolution } from "@/lib/services";

const solutionIcons = { "premium-ia": Bot, "portal-b2b": Factory, "software-clinico": ShieldCheck, "ventas-pro": ShoppingBag, "presencia-total": MapPin, "qr-kit-ia": QrCode };

export function ServicesCatalog() {
  const [selected, setSelected] = useState<MasterSolution | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  return (
    <section id="servicios" className="border-t border-border py-16 text-solution-foreground md:py-20" aria-labelledby="solutions-heading">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-neon">Catálogo · Abar Digital</p>
            <h2 id="solutions-heading" className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-4xl">6 Soluciones <span className="text-neon">Maestras</span></h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-solution-muted">Tecnología a medida para el siguiente nivel de tu negocio.</p>
        </div>

        <div className="mt-8 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {masterSolutions.map((solution, index) => {
            const Icon = solutionIcons[solution.id as keyof typeof solutionIcons];
            return (
              <article key={solution.id} className={`group flex min-w-0 flex-col rounded-lg border bg-solution-surface p-6 transition-colors ${solution.featured ? "border-neon/60" : "border-border hover:border-neon/40"}`}>
                <div className="flex min-h-10 items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2 text-xs font-bold uppercase">
                    <span className="text-solution-muted">0{index + 1}</span>
                    <span className={solution.featured ? "text-neon" : "text-cyan"}>{solution.level}</span>
                  </div>
                  <Icon size={26} strokeWidth={1.6} className="shrink-0 text-neon" aria-hidden="true" />
                </div>
                <h3 className="mt-5 min-h-[5.25rem] font-display text-xl font-bold leading-7">{solution.title}</h3>
                <div className="mt-4 border-b border-border pb-5">
                  <p className="text-xs font-medium text-solution-muted">Precio especial</p>
                  <p className="mt-2 flex items-baseline gap-2 font-display text-4xl font-extrabold tabular-nums">{formatClp(solution.price)} <span className="font-sans text-xs font-semibold text-solution-muted">CLP</span></p>
                  <p className={`mt-2 text-xs font-semibold ${solution.permanent ? "text-neon" : "text-solution-muted"}`}>{solution.permanent ? "Permanente" : "Tiempo limitado"}</p>
                </div>
                <p className="mt-5 min-h-[4.5rem] text-sm leading-6">{solution.summary}</p>
                <ul className="mt-4 flex-1 space-y-3 text-sm leading-6">
                  {solution.inclusions.map((inclusion) => <li key={inclusion} className="flex items-start gap-2.5"><Check size={16} strokeWidth={2.5} className="mt-1 shrink-0 text-neon" aria-hidden="true" /><span>{inclusion}</span></li>)}
                </ul>
                <div className="mt-5 flex min-h-10 items-center border-t border-border pt-3 text-xs leading-5 text-solution-muted">
                  {solution.endorsement ? <span>{solution.endorsement}</span> : solution.permanent ? <span className="flex items-center gap-2 text-neon"><Gift size={14} aria-hidden="true" /> Kit IA incluido de regalo</span> : null}
                </div>
                <Button variant="solution" size="lg" className="mt-4 h-12 w-full justify-between px-4" onClick={(event) => { trigger.current = event.currentTarget; setSelected(solution); }}>
                  Lo quiero <ArrowUpRight aria-hidden="true" />
                </Button>
              </article>
            );
          })}
        </div>
      </div>
      {selected && <ServiceCheckout key={selected.id} item={selected} onClose={() => setSelected(null)} onReturnFocus={() => trigger.current?.focus()} />}
    </section>
  );
}