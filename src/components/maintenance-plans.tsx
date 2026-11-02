import { ArrowUpRight, CalendarDays, Check, Cloud, Crown, Gauge, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { annualMaintenanceSavings, maintenanceInclusions, maintenancePlans, maintenanceWhatsAppUrl, type MaintenanceBilling } from "@/lib/maintenance";
import { formatClp } from "@/lib/services";

const planIcons = [Cloud, ShieldCheck, Gauge, Crown];

function PlanOptions({ billing }: { billing: MaintenanceBilling }) {
  const annual = billing === "annual";
  return (
    <>
      <div className="mt-7 flex min-h-12 items-center gap-3 border-y border-border py-4 text-sm leading-relaxed text-solution-muted">
        <ShieldCheck size={20} className="shrink-0 text-cyan" aria-hidden="true" />
        <p>{annual ? "Pago único · Precio congelado por todo un año" : "Precio protegido por 6 meses en Básico, Pro y Élite · Esencial mantiene su precio permanente"}</p>
      </div>
      <div className="mt-7 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {maintenancePlans.map((plan, index) => {
          const Icon = planIcons[index] ?? Cloud;
          return (
            <article key={plan.id} aria-labelledby={`${billing}-${plan.id}`} className="flex min-w-0 flex-col rounded-lg border border-border bg-solution-surface p-5 transition-colors hover:border-neon/40">
              <div className="flex items-center justify-between gap-3">
                <h3 id={`${billing}-${plan.id}`} className="font-display text-xl font-bold tracking-normal">{plan.name}{annual && <span className="sr-only"> Anual</span>}</h3>
                <Icon size={24} strokeWidth={1.6} className="shrink-0 text-cyan" aria-hidden="true" />
              </div>
              <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-solution-muted">{plan.description}</p>
              <div className="mt-4 border-b border-border pb-5">
                <p className="flex flex-wrap items-baseline gap-x-1.5 font-display text-3xl font-extrabold tabular-nums">{formatClp(annual ? plan.annualPrice : plan.monthlyPrice)} <span className="font-sans text-xs font-medium text-solution-muted">/ {annual ? "año" : "mes"}</span></p>
                <p className="mt-2 text-xs text-solution-muted">CLP · {annual ? "Pago único" : plan.priceProtectionMonths === null ? "Precio permanente" : `Protegido por ${plan.priceProtectionMonths} meses`}</p>
                <p className="mt-3 min-h-5 text-xs font-semibold text-neon">{annual ? `Ahorras ${formatClp(annualMaintenanceSavings(plan))} CLP al año*` : ""}</p>
              </div>
              <ul className="mt-5 flex-1 space-y-3 text-sm leading-6">
                {maintenanceInclusions(plan, billing).map((feature) => <li key={feature} className="flex items-start gap-2"><Check size={15} className="mt-1 shrink-0 text-neon" aria-hidden="true" /><span>{feature}</span></li>)}
              </ul>
              {plan.exclusion && <p className="mt-5 border-t border-border pt-4 text-xs leading-5 text-solution-muted">{plan.exclusion}</p>}
              <Button asChild variant="solution" size="lg" className="mt-6 h-auto min-h-12 w-full justify-between whitespace-normal px-3 py-3 text-left text-sm">
                <a href={maintenanceWhatsAppUrl(plan, billing)} target="_blank" rel="noopener noreferrer" aria-label={`Contratar ${plan.name} ${annual ? "Anual" : "Mensual"} por WhatsApp`}>Contratar plan <ArrowUpRight aria-hidden="true" /></a>
              </Button>
            </article>
          );
        })}
      </div>
      {annual && <p className="mt-5 text-xs leading-5 text-solution-muted">* Ahorro frente a 12 mensualidades a la tarifa actual. Los precios mensuales de Básico, Pro y Élite están protegidos por 6 meses.</p>}
    </>
  );
}

export function MaintenancePlans() {
  return (
    <section id="mantenimiento" aria-labelledby="maintenance-heading" className="border-t border-border py-16 text-solution-foreground md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 id="maintenance-heading" className="max-w-4xl font-display text-2xl font-extrabold uppercase leading-snug tracking-normal md:text-3xl">MANTENIMIENTO DIGITAL <span className="text-neon">PARA TU PLATAFORMA</span></h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-solution-muted">Asegura la continuidad operativa de tu negocio, velocidad optimizada y respaldos en la nube con planes adaptados a cualquier tamaño de empresa.</p>
        <Tabs defaultValue="monthly" className="mt-8">
          <TabsList aria-label="Modalidad de contratación del mantenimiento" className="grid h-auto w-full max-w-md grid-cols-2 gap-1 rounded-lg border border-border bg-solution-surface p-1.5">
            <TabsTrigger value="monthly" className="min-h-12 gap-2 whitespace-normal py-2 font-semibold data-[state=active]:bg-solution-cta data-[state=active]:text-solution-cta-foreground data-[state=inactive]:text-solution-muted"><CalendarDays size={17} className="shrink-0" aria-hidden="true" />Pago mensual</TabsTrigger>
            <TabsTrigger value="annual" className="min-h-12 gap-2 whitespace-normal py-2 font-semibold data-[state=active]:bg-solution-cta data-[state=active]:text-solution-cta-foreground data-[state=inactive]:text-solution-muted"><ShieldCheck size={17} className="shrink-0" aria-hidden="true" />Pago anual</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="mt-0"><PlanOptions billing="monthly" /></TabsContent>
          <TabsContent value="annual" className="mt-0"><PlanOptions billing="annual" /></TabsContent>
        </Tabs>
      </div>
    </section>
  );
}