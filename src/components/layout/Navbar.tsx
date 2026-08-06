import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import logoImg from "@/assets/logo-la-estacion.png";
import { ActionButton } from "@/components/ui/action-button";
import { MENSAJES, SITE, whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Mayoristas", href: "#mayoristas" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-nav py-2" : "bg-transparent py-4",
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8"
      >
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          <img
            src={logoImg}
            alt={`Logo de ${SITE.nombre} Licorera`}
            width={200}
            height={136}
            className={cn(
              "w-auto shrink-0 object-contain transition-all duration-500 drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]",
              scrolled ? "h-12 sm:h-14" : "h-16 sm:h-20",
            )}
          />
          <span className="sr-only">{SITE.nombre}</span>
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ActionButton href={whatsappUrl(MENSAJES.asesor)} variant="whatsapp" size="md">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </ActionButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-gold/60 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass-nav mt-2 animate-fade-in lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3.5 text-base text-muted-foreground transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <ActionButton
                href={whatsappUrl(MENSAJES.asesor)}
                variant="whatsapp"
                size="lg"
                className="w-full"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Hablar por WhatsApp
              </ActionButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
