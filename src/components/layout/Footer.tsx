import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Store,
} from "lucide-react";
import { MENSAJES, SITE, externalClick, whatsappUrl } from "@/config/site";
import { TikTokIcon } from "@/components/ui/tiktok-icon";
import { LOGO_IMAGE } from "@/assets/logo-data";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Mayoristas", href: "#mayoristas" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const LOCATION_COORDS = { lat: 1.849722, lng: -76.048611 };

const LUXURY_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#0f0d0b" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f0d0b" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#c5a059" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#dfc17b" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a88746" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#161310" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#241f19" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#161310" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e8147" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#3a3024" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f1a14" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#181512" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#080706" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b5832" }],
  },
];

export function Footer() {
  const API_KEY =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as unknown as { env?: Record<string, string> }).env
      ?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    (globalThis as unknown as Record<string, string>).GOOGLE_MAPS_PLATFORM_KEY ||
    "";

  const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY";

  return (
    <footer className="border-t border-border/70 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <img
            src={LOGO_IMAGE}
            alt={`Logo de ${SITE.nombre} Licorera`}
            width={320}
            height={218}
            loading="lazy"
            className="h-24 w-auto object-contain sm:h-28 drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {SITE.eslogan}. Atención al detal y al por mayor con entregas coordinadas según
            disponibilidad.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={SITE.redes.instagram}
              onClick={externalClick(SITE.redes.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={SITE.redes.facebook}
              onClick={externalClick(SITE.redes.facebook)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={SITE.redes.tiktok}
              onClick={externalClick(SITE.redes.tiktok)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <TikTokIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappUrl(MENSAJES.asesor)}
              onClick={externalClick(whatsappUrl(MENSAJES.asesor))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full border border-whatsapp/40 text-whatsapp transition-colors hover:bg-whatsapp hover:text-background"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Enlaces del pie de página" className="lg:col-span-3">
          <h3 className="text-[0.68rem] uppercase tracking-[0.3em] text-gold">Navegación</h3>
          <ul className="mt-5 space-y-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div id="contacto" className="flex flex-col lg:col-span-5">
          <h3 className="text-[0.68rem] uppercase tracking-[0.3em] text-gold">Contacto</h3>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
              <span>{SITE.direccion}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
              <span>{SITE.horario}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
              <span>{SITE.telefono}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold">
                {SITE.email}
              </a>
            </li>
          </ul>

          {/* Recuadro con el mapa personalizado */}
          <div className="mt-6 relative h-48 sm:h-56 w-full overflow-hidden rounded-2xl border border-gold/40 shadow-xl">
            {hasValidKey ? (
              <APIProvider apiKey={API_KEY} version="weekly">
                <Map
                  defaultCenter={LOCATION_COORDS}
                  defaultZoom={16}
                  mapId="LA_ESTACION_LUXURY_MAP_FOOTER"
                  styles={LUXURY_MAP_STYLES}
                  internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                  style={{ width: "100%", height: "100%" }}
                  disableDefaultUI={false}
                  zoomControl={true}
                >
                  <AdvancedMarker position={LOCATION_COORDS} title={SITE.nombre}>
                    <div className="relative flex items-center justify-center">
                      <div className="absolute h-10 w-10 animate-ping rounded-full bg-gold/30" />
                      <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold bg-black shadow-[0_0_15px_oklch(0.75_0.105_85)]">
                        <Store className="h-4 w-4 text-gold" />
                      </div>
                    </div>
                  </AdvancedMarker>
                </Map>
              </APIProvider>
            ) : (
              <div className="relative h-full w-full bg-[#0d0c0b]">
                <iframe
                  title={`Ubicación de ${SITE.nombre} en Google Maps`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    `${SITE.direccion}, Pitalito, Huila, Colombia`,
                  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "invert(90%) hue-rotate(180deg) contrast(1.2) brightness(0.85)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full opacity-90"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.nombre}. Todos los derechos reservados.
          </p>
          <p>Prohibida la venta de bebidas alcohólicas a menores de 18 años.</p>
        </div>
      </div>
    </footer>
  );
}
