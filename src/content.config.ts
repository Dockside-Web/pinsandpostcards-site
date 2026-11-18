// The blog. Each post is a Markdown file in src/content/blog/; its file name
// is its address (track-countries-visited.md → /blog/track-countries-visited).
// The header at the top of the file (between the --- lines) is checked here
// when the site builds, so a missing title or a typo'd date fails loudly.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // The Google snippet and the summary on /blog. 140-160 characters.
      description: z.string().min(100).max(170),
      pubDate: z.coerce.date(),
      author: z.string().default("Riley Caldwell"),
      // The photo at the top of the post, also cropped for link previews.
      hero: image(),
      heroAlt: z.string(),
    }),
});

// The changelog at /changelog: one Markdown file per version in
// src/content/changelog/ (1.0.md, 1.1.md…), newest first by date. Each has an
// optional picture under its summary.
const changelog = defineCollection({
  loader: glob({ base: "./src/content/changelog", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      // "1.0", "1.1", "1.1.2".
      version: z.string().regex(/^\d+\.\d+(\.\d+)?$/),
      date: z.coerce.date(),
      title: z.string(),
      // The line under the title, before the details.
      summary: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

export const collections = { blog, changelog };
