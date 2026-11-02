import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ServiceCheckout } from "@/components/service-checkout";
import { masterSolutions } from "@/lib/services";

afterEach(() => { cleanup(); vi.useRealTimers(); });

const expected = [
  ["Ecosistema Premium + Automatización IA (Nivel Pro)", 320000, "https://mpago.la/2dzfx5r", false],
  ["Portal B2B Corporativo (Nivel Industria)", 280000, "https://mpago.la/32FmewG", false],
  ["Software Clínico & Gestión Médica Estética (Nivel Clínico)", 249000, "https://mpago.la/2TMah4Y", false],
  ["Sistema de Ventas Automatizado PRO (Más Vendido)", 149000, "https://mpago.la/2tjfinM", false],
  ["Pack Presencia Total Digital (Google + Redes)", 89900, "https://mpago.la/2f5wJ6w", false],
  ["Código QR Profesional + Regalo Kit IA (Gancho de Entrada)", 14900, "https://mpago.la/1SiEY4T", true],
] as const;

describe("Master solutions business rules", () => {
  it("contains exactly the six solutions in strictly decreasing offer-price order", () => {
    expect(masterSolutions.map((item) => item.price)).toEqual([320000, 280000, 249000, 149000, 89900, 14900]);
  });

  expected.forEach(([name, price, paymentUrl, permanent]) => {
    it(`uses the authorized price and checkout for ${name}`, () => {
      const item = masterSolutions.find((entry) => entry.name === name);
      expect(item?.price).toBe(price);
      expect(item?.paymentUrl).toBe(paymentUrl);
      expect(Boolean(item?.permanent)).toBe(permanent);
    });
  });

  it("blocks payment for 1.5 seconds, then enables the authorized new-tab destination", () => {
    vi.useFakeTimers();
    const item = masterSolutions[0];
    if (!item) throw new Error("Missing premium solution");
    render(<ServiceCheckout item={item} onClose={vi.fn()} />);
    const payment = within(screen.getByRole("dialog")).getByRole("link", { name: /Confirmar y pagar/ });
    expect(payment.getAttribute("aria-disabled")).toBe("true");
    expect(fireEvent.click(payment)).toBe(false);
    act(() => vi.advanceTimersByTime(1499));
    expect(payment.getAttribute("aria-disabled")).toBe("true");
    act(() => vi.advanceTimersByTime(1));
    expect(payment.getAttribute("aria-disabled")).toBe("false");
    expect(payment.getAttribute("href")).toBe("https://mpago.la/2dzfx5r");
    expect(payment.getAttribute("target")).toBe("_blank");
  });
});