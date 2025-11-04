import { ClientConfig, createClient } from "@sanity/client";

const isDev = process.env.NODE_ENV === "development";
const token = process.env.SANITY_API_READ_TOKEN;

export const sanityConfig: ClientConfig = {
  projectId: "yv4kqawl",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: !isDev,
  token,
  perspective: isDev && token ? "drafts" : "published",
};

export default createClient(sanityConfig);
