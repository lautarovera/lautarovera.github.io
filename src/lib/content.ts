import { getCollection, type CollectionEntry } from 'astro:content';

export type ArticleCollection = 'blog' | 'projects';

/** Entries visible in the current build (drafts only in dev), newest first. */
export async function getPublished<C extends ArticleCollection>(
	collection: C,
): Promise<CollectionEntry<C>[]> {
	const entries = await getCollection(
		collection,
		({ data }) => import.meta.env.DEV || !data.draft,
	);
	return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** ISO date (YYYY-MM-DD): unambiguous in any locale. */
export function isoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}
