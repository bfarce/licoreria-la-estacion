import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "La Estación | Licorería & Bar en Pitalito - Licores al Detal" },
      {
        name: "description",
        content:
          "La Estación Licorería & Bar en Pitalito, Huila. Venta al detal de licores nacionales e importados: aguardiente, whisky, ron, tequila, ginebra, vodka, vinos y cerveza. Atención personalizada y servicio a domicilio.",
      },
      {
        name: "keywords",
        content:
          "licorería, licorera, La Estación, La Estación Pitalito, bar, licores, aguardiente, whisky, ron, tequila, ginebra, vodka, cerveza, licorería Pitalito, licores Pitalito, bar Pitalito, licores al detal, licores a domicilio, Huila licores",
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:site_name", content: "La Estación Licorería & Bar" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0F0F0F" },
      {
        property: "og:title",
        content: "La Estación | Licorería & Bar en Pitalito - Licores al Detal",
      },
      {
        name: "twitter:title",
        content: "La Estación | Licorería & Bar en Pitalito - Licores al Detal",
      },
      {
        property: "og:description",
        content:
          "La Estación Licorería & Bar en Pitalito, Huila. Venta al detal de licores nacionales e importados: aguardiente, whisky, ron, tequila y cerveza. Servicio a domicilio.",
      },
      {
        name: "twitter:description",
        content:
          "La Estación Licorería & Bar en Pitalito, Huila. Venta al detal de licores nacionales e importados: aguardiente, whisky, ron, tequila y cerveza. Servicio a domicilio.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0d84b9e0-514d-4c52-a844-0cd14a6b67a4/id-preview-9f260f34--5fb50435-5842-4cc4-861b-308d3f54235c.lovable.app-1785897199539.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0d84b9e0-514d-4c52-a844-0cd14a6b67a4/id-preview-9f260f34--5fb50435-5842-4cc4-861b-308d3f54235c.lovable.app-1785897199539.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["LiquorStore", "BarOrPub"],
    name: "La Estación Licorería & Bar",
    image: "/logo-la-estacion.png",
    description:
      "Venta al detal de licores nacionales e importados en Pitalito. Selección exclusiva de aguardiente, whisky, ron, tequila, ginebra y cerveza.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrera 15 # 19B 04 SUR",
      addressLocality: "Pitalito",
      addressRegion: "Huila",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 1.849722,
      longitude: -76.048611,
    },
    telephone: "+573123526566",
    email: "laestacionpitalito2025@gmail.com",
    priceRange: "$$",
    sameAs: [
      "https://www.instagram.com/laestacionpitalito",
      "https://www.facebook.com/LicoreraLaEstacionPitalito",
      "https://www.tiktok.com/@laestacionpitalito",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "00:00",
      },
    ],
    servesCuisine: "Licores, Bebidas, Bar",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo de Licores La Estación",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Aguardiente Doble Anís" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Aguardiente Antioqueño" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Whisky Old Parr 12 Años" } },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Whisky Buchanan's Deluxe 12 Años" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Whisky Johnnie Walker Black Label" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Ron Viejo de Caldas 3 Años" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Tequila Don Julio Reposado" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Ginebra Tanqueray London Dry" },
        },
      ],
    },
  };

  return (
    <html lang="es">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
