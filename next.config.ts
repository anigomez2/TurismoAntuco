import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Imágenes servidas desde el CDN de Sanity.
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  // El Studio de Sanity usa algunos paquetes que conviene transpilar.
  experimental: {
    // Nada crítico por ahora; se deja el objeto listo para futuras opciones.
  },
};

export default nextConfig;
