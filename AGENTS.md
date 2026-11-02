<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Case studies
- Keep client-specific case-study presentations in dedicated components and select them only for the matching case, so other case dialogs and page sections stay unchanged.
- Aqua Viva Spa screenshots are physical PNG files in `public/assets/cases/aquaviva/`, referenced as `/assets/cases/aquaviva/hero.png`, `/assets/cases/aquaviva/agendamiento.png`, and `/assets/cases/aquaviva/sistema-interno.png`; public paths persist across GitHub/Vercel deployments without relying on CDN assets.
- De Fragmentada a Soberana uses physical screenshots under `public/assets/cases/soberana/` and an extension-agnostic image list with intrinsic dimensions and deferred secondary loading, preserving deployment portability and avoiding image distortion.
- JC Impresoras y PC uses physical WebP screenshots under `public/assets/cases/jcimpresoras/` (`hero.webp`, `formulario.webp`) with the same extension-agnostic, intrinsic-dimension pattern as the other case studies.

## Service catalog
- Keep the service catalog and accessible quick checkout in dedicated components backed by one browser-safe service-data module; pricing, ordering and authorized payment destinations stay synchronized and testable without modifying upper page sections.
- Catalog and payment controls use semantic tokens and shared Button variants; dialogs use Radix focus management and block payment confirmation until the configured preparation delay ends.

## Maintenance plans
- Keep maintenance pricing, service limits, billing terms and WhatsApp message generation in a separate browser-safe data module with an isolated tabbed section after the catalog; annual savings are derived from the selected annual price versus twelve current monthly payments, preventing stale discount claims.
