import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ProductoCard } from "./ProductoCard";
import { catalogKeys, getProductos } from "@/services/catalogService";
import { ActionButton } from "@/components/ui/action-button";
import { MENSAJES, whatsappUrl } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";

const INITIAL_LIMIT = 4;

const CATEGORIAS_TAB = [
  { id: "todos", label: "Todos" },
  { id: "whisky", label: "Whisky" },
  { id: "vodka", label: "Vodka" },
  { id: "cerveza", label: "Cerveza" },
  { id: "champanas", label: "Champañas" },
  { id: "importados", label: "Importados" },
];

export function ProductosDestacados() {
  const [activeTab, setActiveTab] = useState("todos");
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: productos = [], isLoading } = useQuery({
    queryKey: catalogKeys.productos,
    queryFn: getProductos,
  });
  const head = useReveal<HTMLDivElement>();

  const filteredProductos = useMemo(() => {
    if (activeTab === "todos") return productos;
    return productos.filter((p) => p.categoria === activeTab);
  }, [productos, activeTab]);

  const visibleProductos = isExpanded
    ? filteredProductos
    : filteredProductos.slice(0, INITIAL_LIMIT);

  const hasMore = filteredProductos.length > INITIAL_LIMIT;
  const hiddenCount = filteredProductos.length - INITIAL_LIMIT;

  const handleToggleExpand = () => {
    if (isExpanded) {
      setIsExpanded(false);
      const sectionEl = document.getElementById("productos");
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setIsExpanded(true);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsExpanded(false);
  };

  return (
    <section id="productos" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--gold)_35%,transparent),transparent)]"
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={head.ref} className={head.className}>
          <SectionHeading
            eyebrow="Selección destacada"
            title="Catálogo de licores"
            description="Explora nuestras marcas destacadas. Selecciona una categoría o expande la lista para ver la selección."
          />
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIAS_TAB.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                type="button"
                className={`relative cursor-pointer rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? "border border-gold bg-gold/15 text-gold shadow-[0_0_20px_-5px_oklch(0.75_0.105_85/0.4)]"
                    : "border border-border/80 bg-card/60 text-muted-foreground hover:border-gold/50 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: INITIAL_LIMIT }).map((_, i) => (
              <div key={i} className="h-[28rem] animate-pulse rounded-2xl bg-card" />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-500">
              {visibleProductos.map((p, i) => (
                <ProductoCard key={p.id} producto={p} index={i} />
              ))}
            </div>

            {filteredProductos.length === 0 && (
              <p className="mt-12 text-center text-sm text-muted-foreground">
                No hay productos disponibles en esta categoría por el momento.
              </p>
            )}

            {/* Expand / Collapse Control */}
            {hasMore && (
              <div className="mt-12 flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleToggleExpand}
                  className="card-premium group relative inline-flex items-center gap-3 rounded-full border border-gold/40 bg-card/90 px-8 py-3.5 text-sm font-medium tracking-wide text-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_25px_-5px_oklch(0.75_0.105_85/0.3)] hover:text-gold"
                >
                  <Sparkles className="h-4 w-4 text-gold transition-transform group-hover:scale-125" />
                  <span>
                    {isExpanded
                      ? "Ver menos productos"
                      : `Ver más productos (+${hiddenCount} disponibles)`}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-gold transition-transform group-hover:-translate-y-0.5" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gold transition-transform group-hover:translate-y-0.5" />
                  )}
                </button>
                <p className="text-xs text-muted-foreground">
                  {isExpanded
                    ? `Mostrando los ${filteredProductos.length} productos`
                    : `Mostrando ${INITIAL_LIMIT} de ${filteredProductos.length} productos`}
                </p>
              </div>
            )}
          </>
        )}

        <div className="mt-14 text-center">
          <ActionButton href={whatsappUrl(MENSAJES.asesor)} variant="outline" size="lg">
            Solicitar catálogo completo por WhatsApp
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
