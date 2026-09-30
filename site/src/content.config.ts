import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One source for docs: the repo-root docs/ folder. README.md in a folder becomes that folder's index.
const docs = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "../docs",
    generateId: ({ entry }) => entry.replace(/\.md$/i, "").replace(/(^|\/)README$/i, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = { docs };
