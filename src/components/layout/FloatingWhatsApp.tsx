import { MessageCircle } from "lucide-react";
import { MENSAJES, externalClick, whatsappUrl } from "@/config/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(MENSAJES.asesor)}
      onClick={externalClick(whatsappUrl(MENSAJES.asesor))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con un asesor por WhatsApp"
      className="fixed bottom-6 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-background shadow-[0_14px_38px_-10px_oklch(0.68_0.16_152/0.7)] transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
