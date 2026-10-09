import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "bruno-fernandes.dev",
    short_name: "Bruno",
    description: "Bruno Fernandes' personal website",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f4f2",
    theme_color: "#8d263b",
    icons: [
      { src: "/manifest-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/manifest-icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/manifest-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/manifest-icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
