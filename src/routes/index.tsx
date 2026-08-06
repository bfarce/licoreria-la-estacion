import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { Categorias } from "@/components/sections/Categorias";
import { ProductosDestacados } from "@/components/sections/ProductosDestacados";
import { Mayoristas } from "@/components/sections/Mayoristas";
import { Ubicacion } from "@/components/sections/Ubicacion";
import { PorQueElegirnos } from "@/components/sections/PorQueElegirnos";
import { Nosotros } from "@/components/sections/Nosotros";
import { Testimonios } from "@/components/sections/Testimonios";
import { Faq } from "@/components/sections/Faq";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { SITE } from "@/config/site";

const TITLE = "La Estación | Licores al por mayor y al detal en Pitalito";
const DESCRIPTION =
  "Catálogo premium de licores nacionales e importados en Pitalito. Whisky, ron, vodka, vinos y champañas al por mayor y al detal. Cotiza por WhatsApp en minutos.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LiquorStore",
          name: SITE.nombre,
          description: DESCRIPTION,
          telephone: SITE.telefono,
          email: SITE.email,
          address: { "@type": "PostalAddress", streetAddress: SITE.direccion },
          openingHours: "Mo-Sa 09:00-22:00",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Categorias />
        <ProductosDestacados />
        <Mayoristas />
        <Ubicacion />
        <PorQueElegirnos />
        <Nosotros />
        <Testimonios />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
