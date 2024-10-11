import { ClientConfig, createClient } from "@sanity/client";

export const sanityConfig: ClientConfig = {
  projectId: "yv4kqawl",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: true,
} as const;

export default createClient(sanityConfig);
