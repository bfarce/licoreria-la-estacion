import type { MouseEvent } from "react";

/**
 * Configuración central del sitio.
 * Cambiar aquí el número de WhatsApp y los datos de contacto.
 */
export const SITE = {
  nombre: "La Estación",
  eslogan: "Licorería & Bar con la mejor selección de licores nacionales e importados",
  whatsapp: "573123526566", // solo dígitos, con código de país
  email: "laestacionpitalito2025@gmail.com",
  telefono: "+57 312 352 6566",
  direccion: "Carrera 15 # 19B 04 SUR, Pitalito",
  horario:
    "Lun - Jue: 9:00 a.m. - 9:00 p.m. · Vie - Sáb y festivos: 10:00 a.m. - 12:00 a.m. (medianoche)",
  redes: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
} as const;

/** Construye un enlace de WhatsApp con mensaje prellenado. */
export function whatsappUrl(mensaje: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Abre un enlace externo en una pestaña nueva sin abandonar el sitio actual.
 * Se usa como respaldo cuando el `target="_blank"` del anchor no es suficiente
 * (por ejemplo, dentro de iframes o previews).
 */
export function openExternal(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer");
}

/** Handler de click para enlaces externos (WhatsApp, redes sociales). */
export function externalClick(url: string) {
  return (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openExternal(url);
  };
}

const FIRMA = `Escribo desde la web de ${SITE.nombre}.`;

export const MENSAJES = {
  cotizacion: `Hola, buen día. ${FIRMA} Quisiera solicitar una cotización de licores al detal. ¿Me pueden confirmar disponibilidad y precio?`,
  mayorista: `Hola, buen día. ${FIRMA} Quisiera consultar precios y disponibilidad de licores para una reunión o evento. ¿Me pueden brindar información?`,
  eventos: `Hola, buen día. ${FIRMA} Quisiera consultar precios y disponibilidad de licores para una reunión o evento. ¿Me pueden brindar información?`,
  asesor: `Hola, buen día. ${FIRMA} Quisiera hablar con un asesor para recibir información sobre sus productos.`,
  catalogo: `Hola, buen día. ${FIRMA} Quisiera recibir información sobre las referencias que manejan y su disponibilidad.`,
  contacto: `Hola, buen día. ${FIRMA} Quisiera más información sobre sus productos y servicios.`,
  producto: (nombre: string) =>
    `Hola, buen día. ${FIRMA} Me interesa la referencia "${nombre}". ¿Me pueden confirmar disponibilidad, presentación y precio?`,
  categoria: (nombre: string) =>
    `Hola, buen día. ${FIRMA} Quisiera conocer las referencias disponibles de la categoría "${nombre}".`,
} as const;
