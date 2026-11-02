import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { MaintenancePlans } from "@/components/maintenance-plans";
import { annualMaintenanceSavings, maintenancePlans, maintenanceWhatsAppUrl, type MaintenanceBilling } from "@/lib/maintenance";

afterEach(cleanup);

const expected = [
  ["Esencial", 10000, 90000, 30000, null, 0, "none"],
  ["Básico", 20000, 225000, 15000, 6, 1, 24],
  ["Pro", 35000, 405000, 15000, 6, 3, 12],
  ["Élite", 55000, 630000, 30000, 6, "unlimited", "immediate"],
] as const;

describe("Maintenance business rules", () => {
  expected.forEach(([name, monthlyPrice, annualPrice, savings, protection, updates, support]) => {
    it(`retains the monthly and annual prices chosen for ${name}`, () => {
      const plan = maintenancePlans.find((item) => item.name === name);
      expect(plan?.monthlyPrice).toBe(monthlyPrice);
      expect(plan?.annualPrice).toBe(annualPrice);
    });
    it(`calculates the actual annual savings for ${name}`, () => {
      const plan = maintenancePlans.find((item) => item.name === name);
      if (!plan) throw new Error(`Missing ${name}`);
      expect(annualMaintenanceSavings(plan)).toBe(savings);
    });
    it(`honors the price protection period for ${name}`, () => {
      expect(maintenancePlans.find((item) => item.name === name)?.priceProtectionMonths).toBe(protection);
    });
    it(`honors the monthly content update limit for ${name}`, () => {
      expect(maintenancePlans.find((item) => item.name === name)?.contentUpdatesPerMonth).toBe(updates);
    });
    it(`honors the technical support window for ${name}`, () => {
      const plan = maintenancePlans.find((item) => item.name === name);
      expect(typeof plan?.support === "object" ? plan.support.businessHours : plan?.support).toBe(support);
    });
    (["monthly", "annual"] as MaintenanceBilling[]).forEach((billing) => {
      it(`sends the ${name} ${billing} request with its exact price to the corporate WhatsApp`, () => {
        const plan = maintenancePlans.find((item) => item.name === name);
        if (!plan) throw new Error(`Missing ${name}`);
        const url = new URL(maintenanceWhatsAppUrl(plan, billing));
        expect(url.origin + url.pathname).toBe("https://wa.me/56934848427");
        const amount = billing === "annual" ? annualPrice : monthlyPrice;
        const terms = billing === "annual" ? "Pago único con precio congelado por un año." : protection === null ? "Precio permanente." : "Precio protegido por 6 meses.";
        expect(url.searchParams.get("text")).toBe(`Hola Abar Digital, quiero contratar el plan de Mantenimiento Digital ${name} ${billing === "annual" ? "Anual" : "Mensual"} por $${amount.toLocaleString("es-CL")} CLP / ${billing === "annual" ? "año" : "mes"}. ${terms}`);
      });
    });
  });

  it("starts with the four monthly plan destinations", () => {
    render(<MaintenancePlans />);
    const links = within(screen.getByRole("tabpanel")).getAllByRole("link");
    expect(links).toHaveLength(4);
    expect(links.map((link) => new URL(link.getAttribute("href") ?? "").searchParams.get("text"))).toEqual(maintenancePlans.map((plan) => new URL(maintenanceWhatsAppUrl(plan, "monthly")).searchParams.get("text")));
  });
});