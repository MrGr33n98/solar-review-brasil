# Solar Review Brasil - Project Structure
Generated on 2025-06-09 20:10

## Project Overview

This document provides a detailed overview of the project structure and contents.


## Dependencies

### Production Dependencies
| Package | Version |
|---------|---------|
| @hookform/resolvers | ^3.9.0 |
| @next/swc-wasm-nodejs | 13.5.1 |
| @radix-ui/react-accordion | ^1.2.0 |
| @radix-ui/react-alert-dialog | ^1.1.1 |
| @radix-ui/react-aspect-ratio | ^1.1.0 |
| @radix-ui/react-avatar | ^1.1.0 |
| @radix-ui/react-checkbox | ^1.1.1 |
| @radix-ui/react-collapsible | ^1.1.0 |
| @radix-ui/react-context-menu | ^2.2.1 |
| @radix-ui/react-dialog | ^1.1.1 |
| @radix-ui/react-dropdown-menu | ^2.1.1 |
| @radix-ui/react-hover-card | ^1.1.1 |
| @radix-ui/react-label | ^2.1.0 |
| @radix-ui/react-menubar | ^1.1.1 |
| @radix-ui/react-navigation-menu | ^1.2.0 |
| @radix-ui/react-popover | ^1.1.1 |
| @radix-ui/react-progress | ^1.1.0 |
| @radix-ui/react-radio-group | ^1.2.0 |
| @radix-ui/react-scroll-area | ^1.1.0 |
| @radix-ui/react-select | ^2.1.1 |
| @radix-ui/react-separator | ^1.1.0 |
| @radix-ui/react-slider | ^1.2.0 |
| @radix-ui/react-slot | ^1.1.0 |
| @radix-ui/react-switch | ^1.1.0 |
| @radix-ui/react-tabs | ^1.1.0 |
| @radix-ui/react-toast | ^1.2.1 |
| @radix-ui/react-toggle | ^1.1.0 |
| @radix-ui/react-toggle-group | ^1.1.0 |
| @radix-ui/react-tooltip | ^1.1.2 |
| @types/node | 20.6.2 |
| @types/react | 18.2.22 |
| @types/react-dom | 18.2.7 |
| autoprefixer | 10.4.15 |
| class-variance-authority | ^0.7.0 |
| clsx | ^2.1.1 |
| cmdk | ^1.0.0 |
| date-fns | ^3.6.0 |
| embla-carousel-react | ^8.3.0 |
| eslint | 8.49.0 |
| eslint-config-next | 13.5.1 |
| input-otp | ^1.2.4 |
| lucide-react | ^0.446.0 |
| next | 13.5.1 |
| next-themes | ^0.4.6 |
| postcss | 8.4.30 |
| react | 18.2.0 |
| react-day-picker | ^8.10.1 |
| react-dom | 18.2.0 |
| react-hook-form | ^7.53.0 |
| react-resizable-panels | ^2.1.3 |
| recharts | ^2.12.7 |
| sonner | ^1.5.0 |
| tailwind-merge | ^2.5.2 |
| tailwindcss | 3.3.3 |
| tailwindcss-animate | ^1.0.7 |
| typescript | 5.2.2 |
| uuid | ^9.0.0 |
| vaul | ^0.9.9 |
| zod | ^3.23.8 |

### Development Dependencies
| Package | Version |
|---------|---------|
| @types/uuid | ^10.0.0 |

## Directory Structure

- ?? solar-review-brasil
  - ?? .env.local
  - ?? .eslintrc.json
  - ?? .gitignore
  - ?? components.json
  - ?? next-env.d.ts
  - ?? next.config.js
  - ?? package.json
  - ?? postcss.config.js
  - ?? project-overview.md
  - ?? project-structure.md
  - ?? README.md
  - ?? site-relationship-map.md
  - ?? tailwind.config.ts
  - ?? tsconfig.json
  - ?? .bolt
    - ?? config.json
    - ?? ignore
    - ?? prompt
  - ?? .next
    - ?? app-build-manifest.json
    - ?? build-manifest.json
    - ?? fallback-build-manifest.json
    - ?? package.json
    - ?? react-loadable-manifest.json
    - ?? trace
    - ?? cache
      - ?? swc
        - ?? plugins
          - ?? v7_windows_x86_64_0.102.1
      - ?? webpack
        - ?? client-development
          - ?? 0.pack.gz
          - ?? 1.pack.gz
          - ?? 10.pack.gz
          - ?? 11.pack.gz
          - ?? 2.pack.gz
          - ?? 3.pack.gz
          - ?? 4.pack.gz
          - ?? 5.pack.gz
          - ?? 6.pack.gz
          - ?? 7.pack.gz
          - ?? 8.pack.gz
          - ?? 9.pack.gz
          - ?? index.pack.gz
          - ?? index.pack.gz.old
        - ?? client-development-fallback
          - ?? 0.pack.gz
          - ?? 1.pack.gz
          - ?? index.pack.gz
          - ?? index.pack.gz.old
        - ?? server-development
          - ?? 0.pack.gz
          - ?? 1.pack.gz
          - ?? 2.pack.gz
          - ?? 3.pack.gz
          - ?? 4.pack.gz
          - ?? 5.pack.gz
          - ?? 6.pack.gz
          - ?? 7.pack.gz
          - ?? 8.pack.gz
          - ?? index.pack.gz
          - ?? index.pack.gz.old
    - ?? server
      - ?? app-paths-manifest.json
      - ?? middleware-build-manifest.js
      - ?? middleware-manifest.json
      - ?? middleware-react-loadable-manifest.js
      - ?? next-font-manifest.js
      - ?? next-font-manifest.json
      - ?? pages-manifest.json
      - ?? server-reference-manifest.js
      - ?? server-reference-manifest.json
      - ?? webpack-runtime.js
      - ?? _error.js
      - ?? app
        - ?? not-found.js
        - ?? not-found_client-reference-manifest.js
        - ?? page.js
        - ?? page_client-reference-manifest.js
        - ?? _not-found_client-reference-manifest.js
        - ?? calculadora
          - ?? page.js
          - ?? page_client-reference-manifest.js
        - ?? empresa
          - ?? [slug]
        - ?? empresas
          - ?? page.js
            <details>
            <summary>Details</summary>

            - ?? Uses Router
            </details>

          - ?? page_client-reference-manifest.js
      - ?? pages
        - ?? _app.js
        - ?? _document.js
        - ?? _error.js
      - ?? vendor-chunks
        - ?? @floating-ui.js
        - ?? @radix-ui.js
        - ?? @swc.js
        - ?? aria-hidden.js
        - ?? class-variance-authority.js
        - ?? clsx.js
        - ?? detect-node-es.js
        - ?? get-nonce.js
        - ?? lucide-react.js
        - ?? next-themes.js
        - ?? next.js
          <details>
          <summary>Details</summary>

          - ?? Uses Router
          - ?? Contains API calls
          - Dependencies:
            - react-server-dom-webpack/client
          </details>

        - ?? react-remove-scroll-bar.js
        - ?? react-remove-scroll.js
        - ?? react-style-singleton.js
        - ?? sonner.js
        - ?? tailwind-merge.js
        - ?? tslib.js
        - ?? use-callback-ref.js
        - ?? use-sidecar.js
    - ?? static
      - ?? chunks
        - ?? app-pages-internals.js
          <details>
          <summary>Details</summary>

          - ?? Contains API calls
          </details>

        - ?? main-app.js
          <details>
          <summary>Details</summary>

          - ?? Client Component
          - ?? Uses Router
          - ?? Contains API calls
          - Dependencies:
            - react-server-dom-webpack/client
          </details>

        - ?? main.js
          <details>
          <summary>Details</summary>

          - ?? Uses Router
          - ?? Contains API calls
          </details>

        - ?? polyfills.js
        - ?? react-refresh.js
        - ?? webpack.js
          <details>
          <summary>Details</summary>

          - ?? Contains API calls
          </details>

        - ?? _error.js
        - ?? app
          - ?? layout.js
            <details>
            <summary>Details</summary>

            - ?? Uses Router
            - ?? Contains API calls
            </details>

          - ?? not-found.js
          - ?? page.js
            <details>
            <summary>Details</summary>

            - ?? Uses Router
            - ?? Contains API calls
            </details>

          - ?? calculadora
            - ?? page.js
              <details>
              <summary>Details</summary>

              - ?? Contains API calls
              </details>

          - ?? empresa
            - ?? [slug]
          - ?? empresas
            - ?? page.js
              <details>
              <summary>Details</summary>

              - ?? Uses Router
              - ?? Contains API calls
              </details>

        - ?? fallback
          - ?? amp.js
            <details>
            <summary>Details</summary>

            - ?? Uses Router
            - ?? Contains API calls
            </details>

          - ?? main.js
            <details>
            <summary>Details</summary>

            - ?? Uses Router
            - ?? Contains API calls
            </details>

          - ?? react-refresh.js
          - ?? webpack.js
            <details>
            <summary>Details</summary>

            - ?? Contains API calls
            </details>

          - ?? pages
            - ?? _app.js
            - ?? _error.js
        - ?? pages
          - ?? _app.js
          - ?? _error.js
      - ?? css
        - ?? app
          - ?? layout.css
      - ?? development
        - ?? _buildManifest.js
        - ?? _ssgManifest.js
      - ?? media
        - ?? 26a46d62cd723877-s.woff2
        - ?? 55c55f0601d81cf3-s.woff2
        - ?? 581909926a08bbc8-s.woff2
        - ?? 8e9860b6e62d6359-s.woff2
        - ?? 97e0cb1ae144a2a9-s.woff2
        - ?? df0a9ae256c0569c-s.woff2
        - ?? e4af272ccee01ff0-s.p.woff2
      - ?? webpack
        - ?? 18879427ba8ccb35.webpack.hot-update.json
        - ?? 24550126a3620495.webpack.hot-update.json
        - ?? 420c9071d2b2ea2e.webpack.hot-update.json
        - ?? 42d45e15a7edc073.webpack.hot-update.json
        - ?? 49c28701276690ea.webpack.hot-update.json
        - ?? 50f9ee1a0c286236.webpack.hot-update.json
        - ?? 620bd7e8208c448b.webpack.hot-update.json
        - ?? 633457081244afec._.hot-update.json
        - ?? 658e4b7ecb79734d.webpack.hot-update.json
        - ?? 72fbe898b2d5283d.webpack.hot-update.json
        - ?? 76585f10b1e8b716.webpack.hot-update.json
        - ?? 7bd19fa2ec46d580.webpack.hot-update.json
        - ?? 80ed213db813e3ea.webpack.hot-update.json
        - ?? b4dfca73d0168e79.webpack.hot-update.json
        - ?? c06bc04d262efd11.webpack.hot-update.json
        - ?? c1a510c4f2f57d86.webpack.hot-update.json
        - ?? c1ff389892535cc5.webpack.hot-update.json
        - ?? c649e8f8ad92130e.webpack.hot-update.json
        - ?? c76e53af44f6fddc.webpack.hot-update.json
        - ?? cc801963efb8db64.webpack.hot-update.json
        - ?? d0198be3eaed40d1.webpack.hot-update.json
        - ?? d0e0e3d5f5aaa464.webpack.hot-update.json
        - ?? ddcd336da19763d4.webpack.hot-update.json
        - ?? e6ff5820eb44cf31.webpack.hot-update.json
        - ?? e7bec77ef350d46f.webpack.hot-update.json
        - ?? f30d405e77906aad.webpack.hot-update.json
        - ?? f315587b452e06bf.webpack.hot-update.json
        - ?? f904e62dea61b458.webpack.hot-update.json
        - ?? webpack.18879427ba8ccb35.hot-update.js
        - ?? webpack.24550126a3620495.hot-update.js
        - ?? webpack.420c9071d2b2ea2e.hot-update.js
        - ?? webpack.42d45e15a7edc073.hot-update.js
        - ?? webpack.49c28701276690ea.hot-update.js
        - ?? webpack.50f9ee1a0c286236.hot-update.js
        - ?? webpack.620bd7e8208c448b.hot-update.js
        - ?? webpack.658e4b7ecb79734d.hot-update.js
        - ?? webpack.72fbe898b2d5283d.hot-update.js
        - ?? webpack.76585f10b1e8b716.hot-update.js
        - ?? webpack.7bd19fa2ec46d580.hot-update.js
        - ?? webpack.80ed213db813e3ea.hot-update.js
        - ?? webpack.b4dfca73d0168e79.hot-update.js
        - ?? webpack.c06bc04d262efd11.hot-update.js
        - ?? webpack.c1a510c4f2f57d86.hot-update.js
        - ?? webpack.c1ff389892535cc5.hot-update.js
        - ?? webpack.c649e8f8ad92130e.hot-update.js
        - ?? webpack.c76e53af44f6fddc.hot-update.js
        - ?? webpack.cc801963efb8db64.hot-update.js
        - ?? webpack.d0198be3eaed40d1.hot-update.js
        - ?? webpack.d0e0e3d5f5aaa464.hot-update.js
        - ?? webpack.ddcd336da19763d4.hot-update.js
        - ?? webpack.e6ff5820eb44cf31.hot-update.js
        - ?? webpack.e7bec77ef350d46f.hot-update.js
        - ?? webpack.f30d405e77906aad.hot-update.js
        - ?? webpack.f315587b452e06bf.hot-update.js
        - ?? webpack.f904e62dea61b458.hot-update.js
        - ?? app
          - ?? layout.18879427ba8ccb35.hot-update.js
          - ?? layout.24550126a3620495.hot-update.js
          - ?? layout.420c9071d2b2ea2e.hot-update.js
          - ?? layout.42d45e15a7edc073.hot-update.js
          - ?? layout.49c28701276690ea.hot-update.js
          - ?? layout.620bd7e8208c448b.hot-update.js
          - ?? layout.658e4b7ecb79734d.hot-update.js
          - ?? layout.72fbe898b2d5283d.hot-update.js
          - ?? layout.76585f10b1e8b716.hot-update.js
          - ?? layout.7bd19fa2ec46d580.hot-update.js
          - ?? layout.80ed213db813e3ea.hot-update.js
          - ?? layout.c06bc04d262efd11.hot-update.js
          - ?? layout.c1a510c4f2f57d86.hot-update.js
          - ?? layout.c1ff389892535cc5.hot-update.js
          - ?? layout.c649e8f8ad92130e.hot-update.js
          - ?? layout.cc801963efb8db64.hot-update.js
          - ?? layout.d0198be3eaed40d1.hot-update.js
          - ?? layout.d0e0e3d5f5aaa464.hot-update.js
          - ?? layout.ddcd336da19763d4.hot-update.js
          - ?? layout.f30d405e77906aad.hot-update.js
          - ?? layout.f315587b452e06bf.hot-update.js
          - ?? layout.f904e62dea61b458.hot-update.js
          - ?? page.c1a510c4f2f57d86.hot-update.js
            <details>
            <summary>Details</summary>

            - ?? Contains API calls
            </details>

          - ?? page.ddcd336da19763d4.hot-update.js
            <details>
            <summary>Details</summary>

            - ?? Uses Router
            </details>

          - ?? empresas
            - ?? page.420c9071d2b2ea2e.hot-update.js
            - ?? page.c649e8f8ad92130e.hot-update.js
            - ?? page.d0e0e3d5f5aaa464.hot-update.js
            - ?? page.f315587b452e06bf.hot-update.js
              <details>
              <summary>Details</summary>

              - ?? Uses Router
              </details>

    - ?? types
      - ?? package.json
      - ?? app
        - ?? layout.ts
          <details>
          <summary>Details</summary>

          - Exports:
            - PageProps
            - LayoutProps
          </details>

        - ?? page.ts
          <details>
          <summary>Details</summary>

          - Exports:
            - PageProps
            - LayoutProps
          </details>

        - ?? calculadora
          - ?? page.ts
            <details>
            <summary>Details</summary>

            - Exports:
              - PageProps
              - LayoutProps
            </details>

        - ?? empresa
          - ?? [slug]
        - ?? empresas
          - ?? page.ts
            <details>
            <summary>Details</summary>

            - Exports:
              - PageProps
              - LayoutProps
            </details>

  - ?? app
    - ?? globals.css
    - ?? layout.tsx
      <details>
      <summary>Details</summary>

      - Exports:
        - metadata
        - RootLayout
      - Dependencies:
        - next/font/google
        - @/components/header
        - @/components/footer
        - @/components/ui/sonner
      </details>

    - ?? page.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - Home
      - Dependencies:
        - next/link
        - lucide-react
        - @/components/ui/button
        - @/components/ui/badge
        - @/components/banner-carousel
        - @/components/company-card
        - @/components/solar-calculator
        - @/components/google-search
        - @/lib/data
      </details>

    - ?? api
      - ?? companies
        - ?? route.ts
        - ?? [id]
      - ?? contact
        - ?? route.ts
    - ?? calculadora
      - ?? page.tsx
        <details>
        <summary>Details</summary>

        - Exports:
          - CalculatorPage
        - Dependencies:
          - @/components/solar-calculator
          - @/components/ui/card
          - lucide-react
        </details>

    - ?? dashboard
      - ?? page.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Exports:
          - DashboardPage
        - ?? Contains API calls
        - Dependencies:
          - react
          - next/link
          - @/types
          - @/components/ui/card
          - @/components/ui/button
          - @/components/ui/input
          - @/components/ui/table
          - @/components/ui/pagination
        </details>

      - ?? empresas
        - ?? page.tsx
          <details>
          <summary>Details</summary>

          - ?? Client Component
          - Exports:
            - CompaniesDashboardPage
          - ?? Contains API calls
          - Dependencies:
            - react
            - @/components/ui/card
            - @/components/ui/table
            - @/components/ui/button
            - @/components/ui/dialog
            - @/components/ui/input
            - @/components/ui/label
            - @/components/ui/chart
          </details>

    - ?? empresa
      - ?? [slug]
    - ?? empresas
      - ?? page.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Exports:
          - CompaniesPage
        - ?? Uses Router
        - Dependencies:
          - react
          - next/navigation
          - lucide-react
          - @/components/ui/input
          - @/components/ui/button
          - @/components/ui/select
          - @/components/ui/badge
          - @/components/company-card
          - @/components/google-search
          - @/lib/data
          - @/components/sponsor-popup
        </details>

    - ?? planos
      - ?? page.tsx
        <details>
        <summary>Details</summary>

        - Exports:
          - PlanosPage
        - Dependencies:
          - next/link
          - lucide-react
          - @/components/ui/button
          - @/components/ui/card
          - @/components/ui/badge
        </details>

  - ?? components
    - ?? banner-carousel.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - BannerCarousel
      - Dependencies:
        - react
        - next/link
        - lucide-react
        - @/components/ui/button
        - @/lib/data
      </details>

    - ?? company-card.tsx
      <details>
      <summary>Details</summary>

      - Exports:
        - CompanyCard
      - Dependencies:
        - next/link
        - next/image
        - lucide-react
        - @/components/ui/button
        - @/components/ui/badge
        - @/components/verification-badges
        - @/types
      </details>

    - ?? company-jsonld.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - CompanyJsonLd
      - Dependencies:
        - next/script
      </details>

    - ?? company-search.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - CompanySearch
      - ?? Uses Router
      - Dependencies:
        - react
        - next/navigation
        - lucide-react
        - @/components/ui/input
        - @/components/ui/button
      </details>

    - ?? contact-cta.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - ContactCTA
      - Dependencies:
        - next/link
        - @/components/ui/button
      </details>

    - ?? contact-form.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - ContactForm
      - ?? Contains API calls
      - Dependencies:
        - react
        - @/components/ui/input
        - @/components/ui/textarea
        - @/components/ui/button
        - @/hooks/use-toast
      </details>

    - ?? features.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - Features
      - Dependencies:
        - lucide-react
      </details>

    - ?? footer.tsx
      <details>
      <summary>Details</summary>

      - Exports:
        - Footer
      - Dependencies:
        - next/link
        - lucide-react
      </details>

    - ?? google-search.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - GoogleSearch
      - Dependencies:
        - react
        - lucide-react
        - @/components/ui/input
        - @/components/ui/button
        - @/components/ui/card
        - @/lib/data
      </details>

    - ?? header.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - Header
      - Dependencies:
        - next/link
        - lucide-react
        - react
        - @/components/ui/button
        - @/components/ui/input
      </details>

    - ?? hero.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - Hero
      - ?? Uses Router
      - Dependencies:
        - lucide-react
        - @/components/ui/button
        - @/components/ui/input
        - next/navigation
        - react
      </details>

    - ?? home-client.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - HomeClient
      - ?? Uses Router
      - Dependencies:
        - next/navigation
        - @/components/hero
        - @/components/features
        - @/components/how-it-works
        - @/components/contact-cta
        - @/components/company-search
        - @/lib/data
      </details>

    - ?? how-it-works.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - HowItWorks
      - Dependencies:
        - lucide-react
      </details>

    - ?? rating-stars.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - RatingStars
      - Dependencies:
        - lucide-react
      </details>

    - ?? solar-calculator.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - SolarCalculator
      - Dependencies:
        - react
        - lucide-react
        - @/components/ui/button
        - @/components/ui/input
        - @/components/ui/select
        - @/components/ui/card
        - @/lib/data
        - @/types
      </details>

    - ?? sponsor-popup.tsx
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - SponsorPopup
      - Dependencies:
        - next/image
        - next/link
        - @/components/ui/dialog
        - @/components/ui/button
        - @/types
      </details>

    - ?? verification-badges.tsx
      <details>
      <summary>Details</summary>

      - Exports:
        - VerificationBadge
        - verificationBadges
        - VerificationBadges
        - useCompanyBadges
      - Dependencies:
        - lucide-react
        - @/components/ui/badge
        - @/components/ui/tooltip
      </details>

    - ?? ui
      - ?? accordion.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - lucide-react
          - @/lib/utils
        </details>

      - ?? alert-dialog.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
          - @/components/ui/button
        </details>

      - ?? alert.tsx
      - ?? aspect-ratio.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        </details>

      - ?? avatar.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? badge.tsx
        <details>
        <summary>Details</summary>

        - Exports:
          - BadgeProps
        - Dependencies:
          - class-variance-authority
          - @/lib/utils
        </details>

      - ?? breadcrumb.tsx
      - ?? button.tsx
        <details>
        <summary>Details</summary>

        - Exports:
          - ButtonProps
        - Dependencies:
          - @radix-ui/react-slot
          - class-variance-authority
          - @/lib/utils
        </details>

      - ?? calendar.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Exports:
          - CalendarProps
        - Dependencies:
          - lucide-react
          - react-day-picker
          - @/lib/utils
          - @/components/ui/button
        </details>

      - ?? card.tsx
      - ?? carousel.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - ?? Contains API calls
        - Dependencies:
          - lucide-react
          - @/lib/utils
          - @/components/ui/button
        </details>

      - ?? chart.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Exports:
          - ChartConfig
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? checkbox.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - lucide-react
          - @/lib/utils
        </details>

      - ?? collapsible.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        </details>

      - ?? command.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @radix-ui/react-dialog
          - cmdk
          - lucide-react
          - @/lib/utils
          - @/components/ui/dialog
        </details>

      - ?? context-menu.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - lucide-react
          - @/lib/utils
        </details>

      - ?? dialog.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - lucide-react
          - @/lib/utils
        </details>

      - ?? drawer.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - vaul
          - @/lib/utils
        </details>

      - ?? dropdown-menu.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - lucide-react
          - @/lib/utils
        </details>

      - ?? form.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @radix-ui/react-slot
          - react-hook-form
          - @/lib/utils
          - @/components/ui/label
        </details>

      - ?? hover-card.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? input-otp.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - input-otp
          - lucide-react
          - @/lib/utils
        </details>

      - ?? input.tsx
        <details>
        <summary>Details</summary>

        - Exports:
          - InputProps
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? label.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - class-variance-authority
          - @/lib/utils
        </details>

      - ?? menubar.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - lucide-react
          - @/lib/utils
        </details>

      - ?? navigation-menu.tsx
      - ?? pagination.tsx
      - ?? popover.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? progress.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? radio-group.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - lucide-react
          - @/lib/utils
        </details>

      - ?? resizable.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - lucide-react
          - @/lib/utils
        </details>

      - ?? scroll-area.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? select.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - lucide-react
          - @/lib/utils
        </details>

      - ?? separator.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? sheet.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - class-variance-authority
          - lucide-react
          - @/lib/utils
        </details>

      - ?? skeleton.tsx
      - ?? slider.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? sonner.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - next-themes
          - sonner
        </details>

      - ?? switch.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? table.tsx
      - ?? tabs.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? textarea.tsx
        <details>
        <summary>Details</summary>

        - Exports:
          - TextareaProps
        - Dependencies:
          - @/lib/utils
        </details>

      - ?? toast.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - class-variance-authority
          - lucide-react
          - @/lib/utils
        </details>

      - ?? toaster.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Exports:
          - Toaster
        - Dependencies:
          - @/hooks/use-toast
          - @/components/ui/toast
        </details>

      - ?? toggle-group.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - class-variance-authority
          - @/lib/utils
          - @/components/ui/toggle
        </details>

      - ?? toggle.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - class-variance-authority
          - @/lib/utils
        </details>

      - ?? tooltip.tsx
        <details>
        <summary>Details</summary>

        - ?? Client Component
        - Dependencies:
          - @/lib/utils
        </details>

  - ?? hooks
    - ?? use-toast.ts
      <details>
      <summary>Details</summary>

      - ?? Client Component
      - Exports:
        - reducer
      </details>

  - ?? lib
    - ?? contacts.ts
      <details>
      <summary>Details</summary>

      - Exports:
        - contactRequests
      - Dependencies:
        - @/types
      </details>

    - ?? data.ts
      <details>
      <summary>Details</summary>

      - Exports:
        - companies
        - reviews
        - sponsoredContent
        - brazilianStates
      - Dependencies:
        - @/types
      </details>

    - ?? utils.ts
      <details>
      <summary>Details</summary>

      - Exports:
        - cn
      - Dependencies:
        - clsx
        - tailwind-merge
      </details>

  - ?? types
    - ?? index.ts
      <details>
      <summary>Details</summary>

      - Exports:
        - Company
        - Review
        - SponsoredContent
        - SolarCalculation
        - ContactRequest
      </details>


## Project Statistics

- Total Files: 295
- Components: 64
- Pages: 7
- API Routes: 3
- Client Components: 56
- Server Components: 149
