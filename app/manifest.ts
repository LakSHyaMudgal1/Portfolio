import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lakshya Mudgal — Portfolio",
    short_name: "Lakshya Mudgal",
    description: "Portfolio of Lakshya Mudgal, Full-Stack Software Engineer & Final-Year B.Tech IT at IIIT Una.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090d",
    theme_color: "#08090d",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
