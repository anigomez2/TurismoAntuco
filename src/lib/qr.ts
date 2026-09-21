import "server-only";
import QRCode from "qrcode";

/** URL pública base del sitio (para construir los enlaces de los QR). */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

/** URL estable de una ficha (en español, idioma principal de la señalética). */
export function urlFicha(slug: string): string {
  return `${siteUrl()}/es/ficha/${slug}`;
}

/** Genera el código QR de una URL como data URL PNG (para <img>). */
export async function generarQrDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    margin: 1,
    width: 512,
    color: { dark: "#16303A", light: "#FFFFFF" },
    errorCorrectionLevel: "M",
  });
}
