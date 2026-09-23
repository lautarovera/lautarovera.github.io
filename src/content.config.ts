import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { BLOCK_IDS } from './lib/floorplan';

// Blog articles and project case studies share the same frontmatter contract
// (see "Technical article format" in CLAUDE.md).
const article = z.object({
	title: z.string(),
	description: z.string(),
	date: z.coerce.date(),
	updated: z.coerce.date().optional(),
	tags: z.array(z.string()),
	lang: z.enum(['en', 'es']),
	// Which block of the home-page die the entry sits in.
	block: z.enum(BLOCK_IDS),
	// Optional cover image, shown in lists and at the top of the article.
	cover: z
		.object({
			src: z.string(),
			alt: z.string(),
		})
		.optional(),
	// Drafts render in `npm run dev` only, never in the production build.
	draft: z.boolean().default(false),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: article,
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: article,
});

export const collections = { blog, projects };
