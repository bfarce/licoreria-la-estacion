import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { catalogKeys, getCategorias } from "@/services/catalogService";
import { MENSAJES, externalClick, whatsappUrl } from "@/config/site";

export function Categorias() {
  const { data: categorias = [] } = useQuery({
    queryKey: catalogKeys.categorias,
    queryFn: getCategorias,
  });
  const head = useReveal<HTMLDivElement>();

  return (
    <section id="categorias" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={head.ref} className={head.className}>
          <SectionHeading
            eyebrow="Catálogo"
            title="Explora por categoría"
            description="Una selección curada de destilados, cervezas y espumosos. Escríbenos por WhatsApp para confirmar disponibilidad."
          />
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {categorias.map((c, i) => (
            <CategoriaCard key={c.id} nombre={c.nombre} descripcion={c.descripcion} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function CategoriaCard({
  nombre,
  descripcion,
  index,
}: {
  nombre: string;
  descripcion: string;
  index: number;
}) {
  const reveal = useReveal<HTMLLIElement>({ delay: index * 70, variant: "up" });
  return (
    <li ref={reveal.ref} className={reveal.className} style={reveal.style}>
      <a
        href={whatsappUrl(MENSAJES.categoria(nombre))}
        onClick={externalClick(whatsappUrl(MENSAJES.categoria(nombre)))}
        target="_blank"
        rel="noopener noreferrer"
        className="card-premium sheen-hover group relative flex h-40 flex-col justify-end overflow-hidden rounded-2xl p-5 sm:h-52 sm:p-7"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 90% at 85% 0%, oklch(0.6 0.13 62 / 0.28), transparent 62%)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-primary-foreground"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <h3 className="relative font-display text-xl text-foreground transition-colors duration-300 group-hover:text-gold sm:text-2xl">
          {nombre}
        </h3>
        <p className="relative mt-1.5 text-xs text-muted-foreground sm:text-sm">{descripcion}</p>
      </a>
    </li>
  );
}
