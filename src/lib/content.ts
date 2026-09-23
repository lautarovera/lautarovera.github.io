import { getCollection, type CollectionEntry } from 'astro:content';
import { placeCells, type CellInput } from './floorplan';

export type ArticleCollection = 'blog' | 'projects';

/** An article as a cell on the die: case studies are macro cells. */
export interface ArticleCell extends CellInput {
	href: string;
	title: string;
}

export function toCells(
	projects: CollectionEntry<'projects'>[],
	posts: CollectionEntry<'blog'>[],
): ArticleCell[] {
	const cell = (
		entry: CollectionEntry<ArticleCollection>,
		kind: CellInput['kind'],
		basePath: string,
	): ArticleCell => ({
		// Unique across collections: a post and a case study may share a slug.
		id: `${basePath}${entry.id}`,
		kind,
		block: entry.data.block,
		date: entry.data.date,
		href: `${basePath}${entry.id}/`,
		title: entry.data.title,
	});

	return [
		...projects.map((entry) => cell(entry, 'macro', '/projects/')),
		...posts.map((entry) => cell(entry, 'std', '/blog/')),
	];
}

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

/** Where this article sits on the die, e.g. "FW-03". */
export async function diePosition(href: string): Promise<string | undefined> {
	const [projects, posts] = await Promise.all([getPublished('projects'), getPublished('blog')]);
	const placed = placeCells(toCells(projects, posts));
	return placed.find(({ cell }) => cell.href === href)?.position;
}

/** ISO date (YYYY-MM-DD): unambiguous in any locale. */
export function isoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}
