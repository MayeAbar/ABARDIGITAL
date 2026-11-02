import { Content } from "@radix-ui/react-dialog";
import { ArrowUpRight, CreditCard, LockKeyhole, QrCode, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { canConfirmPayment, CHECKOUT_DELAY_MS, formatClp, type MasterSolution } from "@/lib/services";

export function ServiceCheckout({ item, onClose, onReturnFocus }: {
  item: MasterSolution;
  onClose: () => void;
  onReturnFocus?: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const paymentMatches = canConfirmPayment(item);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), CHECKOUT_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const methods = [
    { name: "Visa / Mastercard / Diners", Icon: CreditCard },
    { name: "Webpay / Redcompra", Icon: QrCode },
    { name: "Dinero en cuenta MP", Icon: Wallet },
  ];

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPortal>
        <DialogOverlay className="z-[100] bg-background/80 backdrop-blur-sm motion-reduce:animate-none" />
        <Content
          className="solution-checkout fixed left-1/2 top-1/2 z-[101] flex max-h-[92dvh] w-[calc(100%_-_2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-payment-background font-sans text-payment-foreground shadow-2xl outline-none"
          onCloseAutoFocus={(event) => { if (onReturnFocus) { event.preventDefault(); onReturnFocus(); } }}
        >
          <header className="flex shrink-0 items-center justify-between bg-payment px-5 py-3 text-payment-background">
            <span className="flex items-center gap-2 text-base font-extrabold">
              <span className="grid size-7 place-items-center rounded-md border border-payment-background/50 text-xs" aria-hidden="true">mp</span>
              mercado pago
            </span>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Cerrar checkout" className="text-payment-background hover:bg-payment-background/15 hover:text-payment-background"><X aria-hidden="true" /></Button>
            </DialogClose>
          </header>
          <div className="min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-payment-muted"><LockKeyhole size={14} aria-hidden="true" /> Pago seguro · Mercado Pago Chile</div>
            <DialogTitle className="mt-3 font-display text-xl font-bold leading-snug tracking-normal text-payment-foreground">{item.name}</DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-payment-muted">{item.details}</DialogDescription>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-y border-payment-border py-4">
              <div>
                <p className="text-xs text-payment-muted">{item.permanent ? "Precio permanente" : "Precio especial · Tiempo limitado"}</p>
                <p className="mt-1 text-sm font-semibold">Total a pagar</p>
              </div>
              <p className="font-display text-2xl font-extrabold tabular-nums">{formatClp(item.price)} <span className="font-sans text-xs font-semibold text-payment-muted">CLP</span></p>
            </div>
            <p className="mt-5 text-xs font-bold text-payment-muted">Medios de pago</p>
            <ul className="mt-2 divide-y divide-payment-border">
              {methods.map(({ name, Icon }) => (
                <li key={name} className="flex items-center gap-3 py-2.5 text-sm"><Icon size={20} strokeWidth={1.8} className="shrink-0 text-payment-muted" aria-hidden="true" />{name}</li>
              ))}
            </ul>
            <div role="status" aria-live="polite" className="mt-3 flex min-h-9 items-center justify-center gap-2 text-sm text-payment">
              {loading ? <><span className="size-5 animate-spin rounded-full border-2 border-payment border-t-transparent" aria-hidden="true" /> Preparando checkout seguro…</> : <><LockKeyhole size={16} aria-hidden="true" /> Checkout listo</>}
            </div>
            {!paymentMatches && <p role="alert" className="mt-3 border-l-2 border-destructive bg-payment-surface px-3 py-3 text-sm leading-relaxed text-payment-foreground">El enlace de Mercado Pago muestra {formatClp(item.mismatchedPaymentAmount ?? item.price)} CLP, un importe distinto a esta oferta. El pago está temporalmente pausado para evitar un cobro incorrecto.</p>}
            {paymentMatches ? <Button asChild variant="payment" size="lg" className={`mt-3 h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center ${loading ? "pointer-events-none opacity-50" : ""}`}>
              <a href={item.paymentUrl} target="_blank" rel="noopener noreferrer" aria-disabled={loading} tabIndex={loading ? -1 : 0} onClick={(event) => { if (loading) event.preventDefault(); }}>
                Confirmar y pagar <ArrowUpRight aria-hidden="true" />
              </a>
            </Button> : <Button variant="payment" size="lg" disabled className="mt-3 h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center">Pago temporalmente no disponible</Button>}
          </div>
        </Content>
      </DialogPortal>
    </Dialog>
  );
}