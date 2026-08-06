import { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import {
  MapPin,
  Clock,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  Store,
  Phone,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { SITE, openExternal, whatsappUrl, MENSAJES } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";

// Coordenadas aproximadas de la sede en Pitalito, Huila (Carrera 15 # 19B 04 SUR)
const LOCATION_COORDS = { lat: 1.849722, lng: -76.048611 };

// Enlaces directos a apps de navegación
const GOOGLE_MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITE.nombre} Licorera ${SITE.direccion} Pitalito`,
)}`;

const GOOGLE_MAPS_DIR_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${SITE.direccion}, Pitalito, Huila, Colombia`,
)}`;

const WAZE_DIR_URL = `https://waze.com/ul?q=${encodeURIComponent(
  `${SITE.direccion}, Pitalito`,
)}&navigate=yes`;

// Estilo personalizado Luxury/Dark/Gold para Google Maps
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

export function Ubicacion() {
  const [copied, setCopied] = useState(false);
  const head = useReveal<HTMLDivElement>();
  const mapCard = useReveal<HTMLDivElement>(100);

  const API_KEY =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as unknown as { env?: Record<string, string> }).env
      ?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    (globalThis as unknown as Record<string, string>).GOOGLE_MAPS_PLATFORM_KEY ||
    "";

  const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${SITE.direccion}, Pitalito, Huila`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ubicacion" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={head.ref} className={head.className}>
          <SectionHeading
            eyebrow="Nuestra Sede Principal"
            title="Ubicación y Atención"
            description="Visítanos en nuestro punto de venta en Pitalito o solicita tus despachos y domicilios con entrega inmediata."
          />
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Card con detalles de contacto y dirección */}
          <div className="flex flex-col justify-between space-y-6 rounded-3xl border border-gold/30 bg-card/80 p-8 shadow-2xl backdrop-blur-md lg:col-span-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 text-gold">
                  <Store className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Punto de Venta
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {SITE.nombre} Licorera
                  </h3>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {/* Dirección */}
                <div className="group rounded-2xl border border-border/80 bg-background/60 p-4 transition-all duration-300 hover:border-gold/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          Dirección
                        </p>
                        <p className="mt-0.5 text-base font-semibold text-foreground">
                          {SITE.direccion}
                        </p>
                        <p className="text-xs text-muted-foreground">Pitalito, Huila, Colombia</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      title="Copiar dirección"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:border-gold hover:text-gold"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Horarios */}
                <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Horario de Atención
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-foreground">
                        {SITE.horario}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Teléfono / Atención */}
                <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Línea Directa & Domicilios
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{SITE.telefono}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones directas a Google Maps / Waze */}
            <div className="space-y-3 pt-4">
              <a
                href={GOOGLE_MAPS_DIR_URL}
                onClick={(e) => {
                  e.preventDefault();
                  openExternal(GOOGLE_MAPS_DIR_URL);
                }}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-gold/80 bg-[image:var(--gradient-gold)] bg-[length:200%_auto] bg-left px-6 py-3.5 text-center text-sm font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-all duration-300 hover:bg-right hover:scale-[1.02] hover:shadow-[0_0_30px_0_oklch(0.75_0.105_85/0.6)]"
              >
                <Navigation className="h-5 w-5 text-primary-foreground transition-transform group-hover:rotate-12" />
                <span className="text-primary-foreground font-semibold">
                  Cómo llegar en Google Maps
                </span>
                <ExternalLink className="h-4 w-4 text-primary-foreground opacity-90" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={GOOGLE_MAPS_SEARCH_URL}
                  onClick={(e) => {
                    e.preventDefault();
                    openExternal(GOOGLE_MAPS_SEARCH_URL);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/80 px-4 py-2.5 text-xs font-medium text-foreground transition-all hover:border-gold hover:text-gold"
                >
                  <MapPin className="h-4 w-4 text-gold" />
                  <span>Ver en Maps</span>
                </a>

                <a
                  href={WAZE_DIR_URL}
                  onClick={(e) => {
                    e.preventDefault();
                    openExternal(WAZE_DIR_URL);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/80 px-4 py-2.5 text-xs font-medium text-foreground transition-all hover:border-gold hover:text-gold"
                >
                  <Navigation className="h-4 w-4 text-sky-400" />
                  <span>Abrir Waze</span>
                </a>
              </div>
            </div>
          </div>

          {/* Canvas Interactivo del Mapa con Estilo Luxury */}
          <div
            ref={mapCard.ref}
            className={`relative min-h-[420px] overflow-hidden rounded-3xl border border-gold/40 shadow-2xl lg:col-span-7 ${mapCard.className}`}
          >
            {hasValidKey ? (
              <APIProvider apiKey={API_KEY} version="weekly">
                <Map
                  defaultCenter={LOCATION_COORDS}
                  defaultZoom={16}
                  mapId="LA_ESTACION_LUXURY_MAP"
                  styles={LUXURY_MAP_STYLES}
                  internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                  style={{ width: "100%", height: "100%", minHeight: "420px" }}
                  disableDefaultUI={false}
                  zoomControl={true}
                >
                  <AdvancedMarker position={LOCATION_COORDS} title={SITE.nombre}>
                    <div className="relative flex items-center justify-center">
                      <div className="absolute h-12 w-12 animate-ping rounded-full bg-gold/30" />
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-black shadow-[0_0_20px_oklch(0.75_0.105_85)]">
                        <Store className="h-5 w-5 text-gold" />
                      </div>
                    </div>
                  </AdvancedMarker>
                </Map>
              </APIProvider>
            ) : (
              /* Fallback de mapa interactivo o iframe de Google Maps con filtro luxury */
              <div className="relative h-full w-full min-h-[420px] bg-[#0d0c0b]">
                <iframe
                  title={`Ubicación de ${SITE.nombre} en Google Maps`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    `${SITE.direccion}, Pitalito, Huila, Colombia`,
                  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    minHeight: "420px",
                    filter: "invert(90%) hue-rotate(180deg) contrast(1.2) brightness(0.85)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full opacity-90"
                />

                {/* Badge Overlay Luxury flotante sobre el mapa */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm rounded-2xl border border-gold/40 bg-black/85 p-4 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/50 bg-gold/20 text-gold">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gold">
                        {SITE.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground">{SITE.direccion}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2.5">
                    <span className="text-[11px] text-emerald-400">● Abierto hoy</span>
                    <a
                      href={GOOGLE_MAPS_DIR_URL}
                      onClick={(e) => {
                        e.preventDefault();
                        openExternal(GOOGLE_MAPS_DIR_URL);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline"
                    >
                      <span>Abrir en Google Maps</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
