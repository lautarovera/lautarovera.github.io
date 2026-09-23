/**
 * Die floorplan: the single source of geometry for the home-page die, the
 * header locator and article positions. Pure data and logic, no Astro.
 *
 * Units are abstract die units; renderers scale them to pixels.
 */

export const BLOCK_IDS = ['edge-ai', 'firmware', 'hardware'] as const;
export type BlockId = (typeof BLOCK_IDS)[number];

export interface Rect {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface BlockDef {
	id: BlockId;
	label: string;
	/** Short code used in cell positions, e.g. "FW-03". */
	code: string;
	rect: Rect;
	/** Where cells are placed, in rows. Must lie inside `rect`. */
	cellArea: Rect;
	/** Area kept free for something other than cells (the Phase 3 demo). */
	reserved?: Rect;
}

export interface PadDef {
	id: string;
	label: string;
	href: string;
}

export const DIE: Rect = { x: 0, y: 0, w: 120, h: 76 };

/** Band along the die edge that holds the bond pads. */
export const PAD_RING_WIDTH = 7;

export const BLOCKS: readonly BlockDef[] = [
	{
		id: 'edge-ai',
		label: 'Edge AI',
		code: 'AI',
		rect: { x: 9, y: 11, w: 60, h: 56 },
		reserved: { x: 12, y: 18, w: 54, h: 20 },
		cellArea: { x: 12, y: 42, w: 54, h: 24 },
	},
	{
		id: 'firmware',
		label: 'Firmware',
		code: 'FW',
		rect: { x: 73, y: 11, w: 38, h: 26 },
		cellArea: { x: 76, y: 17, w: 32, h: 19 },
	},
	{
		id: 'hardware',
		label: 'Hardware',
		code: 'HW',
		rect: { x: 73, y: 41, w: 38, h: 26 },
		cellArea: { x: 76, y: 47, w: 32, h: 19 },
	},
];

/**
 * Portrait arrangement for narrow screens: same blocks, stacked, so the die
 * stays legible instead of shrinking to unreadable text.
 */
export const DIE_PORTRAIT: Rect = { x: 0, y: 0, w: 80, h: 120 };

export const BLOCKS_PORTRAIT: readonly BlockDef[] = [
	{
		id: 'edge-ai',
		label: 'Edge AI',
		code: 'AI',
		rect: { x: 11, y: 11, w: 58, h: 47 },
		reserved: { x: 14, y: 17, w: 52, h: 18 },
		cellArea: { x: 14, y: 37, w: 52, h: 18 },
	},
	{
		id: 'firmware',
		label: 'Firmware',
		code: 'FW',
		rect: { x: 11, y: 62, w: 58, h: 22 },
		cellArea: { x: 14, y: 68, w: 52, h: 13 },
	},
	{
		id: 'hardware',
		label: 'Hardware',
		code: 'HW',
		rect: { x: 11, y: 88, w: 58, h: 21 },
		cellArea: { x: 14, y: 94, w: 52, h: 13 },
	},
];

export const PADS: readonly PadDef[] = [
	{ id: 'about', label: 'About', href: '/about/' },
	{ id: 'contact', label: 'Contact', href: '/contact/' },
	{ id: 'github', label: 'GitHub', href: 'https://github.com/lautarovera' },
	{ id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/lautarovera' },
];

// Standard-cell rows: every cell has the row height; case studies are wider.
const ROW_HEIGHT = 5;
const CELL_GAP = 1;
const CELL_WIDTH = { macro: 10, std: 3 } as const;

export type CellKind = keyof typeof CELL_WIDTH;

export interface CellInput {
	id: string;
	kind: CellKind;
	block: BlockId;
	date: Date;
}

export interface PlacedCell<T extends CellInput = CellInput> {
	cell: T;
	rect: Rect;
	/** Permanent position on the die, e.g. "FW-03". */
	position: string;
}

/**
 * Places cells in rows inside their block, oldest first, so a new article
 * never moves existing ones. Throws if a block is full: the die must then
 * be resized, not silently overflowed.
 */
export function placeCells<T extends CellInput>(
	cells: readonly T[],
	blocks: readonly BlockDef[] = BLOCKS,
): PlacedCell<T>[] {
	const placed: PlacedCell<T>[] = [];

	for (const block of blocks) {
		const inBlock = cells
			.filter((cell) => cell.block === block.id)
			.sort((a, b) => a.date.valueOf() - b.date.valueOf() || a.id.localeCompare(b.id));

		const area = block.cellArea;
		let x = area.x;
		let y = area.y;

		inBlock.forEach((cell, index) => {
			const w = CELL_WIDTH[cell.kind];
			if (x + w > area.x + area.w) {
				x = area.x;
				y += ROW_HEIGHT + CELL_GAP;
			}
			if (y + ROW_HEIGHT > area.y + area.h) {
				throw new Error(`Floorplan: block "${block.id}" is full at cell "${cell.id}".`);
			}
			placed.push({
				cell,
				rect: { x, y, w, h: ROW_HEIGHT },
				position: `${block.code}-${String(index + 1).padStart(2, '0')}`,
			});
			x += w + CELL_GAP;
		});
	}

	return placed;
}
