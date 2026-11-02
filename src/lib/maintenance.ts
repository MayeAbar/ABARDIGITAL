import { formatClp } from "@/lib/services";

export type MaintenanceBilling = "monthly" | "annual";

export interface MaintenancePlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  priceProtectionMonths: number | null;
  contentUpdatesPerMonth: number | "unlimited";
  support: { businessHours: number } | "immediate" | "none";
  features: string[];
  annualFeatures: string[];
  exclusion?: string;
}

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: "esencial",
    name: "Esencial",
    description: "Para microempresarios que necesitan su web siempre en línea.",
    monthlyPrice: 10000,
    annualPrice: 90000,
    priceProtectionMonths: null,
    contentUpdatesPerMonth: 0,
    support: "none",
    features: ["Hosting activo", "Renovación de dominio"],
    annualFeatures: [],
    exclusion: "No incluye cambios de contenido ni soporte operativo.",
  },
  {
    id: "basico",
    name: "Básico",
    description: "Continuidad y cuidado esencial para tu presencia digital.",
    monthlyPrice: 20000,
    annualPrice: 225000,
    priceProtectionMonths: 6,
    contentUpdatesPerMonth: 1,
    support: { businessHours: 24 },
    features: ["Hosting activo", "Copias de seguridad mensuales"],
    annualFeatures: [],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Velocidad y contenido al día para un negocio en crecimiento.",
    monthlyPrice: 35000,
    annualPrice: 405000,
    priceProtectionMonths: 6,
    contentUpdatesPerMonth: 3,
    support: { businessHours: 12 },
    features: ["Hosting activo", "Copias de seguridad mensuales", "Revisión de velocidad", "Repaso de Google Business"],
    annualFeatures: ["Prioridad en soporte y auditorías"],
  },
  {
    id: "elite",
    name: "Élite",
    description: "Para software avanzado, clínicas y sistemas con IA.",
    monthlyPrice: 55000,
    annualPrice: 630000,
    priceProtectionMonths: 6,
    contentUpdatesPerMonth: "unlimited",
    support: "immediate",
    features: ["Hosting activo y respaldos", "Reportes mensuales", "Llamada de consultoría estratégica"],
    annualFeatures: ["Acceso anticipado a herramientas de IA", "Canal prioritario directo"],
  },
];

export const annualMaintenanceSavings = (plan: MaintenancePlan) => plan.monthlyPrice * 12 - plan.annualPrice;

export function maintenanceInclusions(plan: MaintenancePlan, billing: MaintenanceBilling) {
  const inclusions = [...plan.features];
  if (plan.contentUpdatesPerMonth === "unlimited") inclusions.push("Actualizaciones menores ilimitadas");
  else if (plan.contentUpdatesPerMonth === 1) inclusions.push("1 actualización menor de contenido al mes");
  else if (plan.contentUpdatesPerMonth > 0) inclusions.push(`${plan.contentUpdatesPerMonth} actualizaciones de contenido al mes`);
  if (plan.support === "immediate") inclusions.push("Soporte prioritario inmediato");
  else if (typeof plan.support === "object") inclusions.push(`Soporte técnico en ${plan.support.businessHours} horas hábiles`);
  if (billing === "annual") inclusions.push(...plan.annualFeatures);
  return inclusions;
}

export function maintenanceWhatsAppUrl(plan: MaintenancePlan, billing: MaintenanceBilling) {
  const annual = billing === "annual";
  const price = annual ? plan.annualPrice : plan.monthlyPrice;
  const terms = annual ? "Pago único con precio congelado por un año." : plan.priceProtectionMonths === null ? "Precio permanente." : `Precio protegido por ${plan.priceProtectionMonths} meses.`;
  const message = `Hola Abar Digital, quiero contratar el plan de Mantenimiento Digital ${plan.name} ${annual ? "Anual" : "Mensual"} por ${formatClp(price)} CLP / ${annual ? "año" : "mes"}. ${terms}`;
  return `https://wa.me/56934848427?text=${encodeURIComponent(message)}`;
}