import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "bruno-fernandes.dev",
    short_name: "bruno-fernandes.dev",
    description: "Bruno Fernandes' personal website",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f2f2f2",
    theme_color: "#a91b1b",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
