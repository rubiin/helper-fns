/**
 *
 *
 * @interface Ipagination
 */

interface Ipagination {
	total_pages: number;
	total_items: number;
	next: string;
	previous: string;
	current_page: number;
	items: any;
}

/**
 *
 *
 * @export
 * @param {number} page
 * @param {number} totalPages
 * @returns {string}
 */
export function hasNext(page: number, totalPages: number): string {
	if (page === totalPages) {
		return '';
	} else {
		return `${page + 1}`;
	}
}

/**
 *
 *
 * @export
 * @param {number} page
 * @returns {string}
 */
export function hasPrevious(page: number): string {
	if (page <= 1) {
		return '';
	} else {
		return `${page - 1}`;
	}
}

/**
 *
 *
 * @export
 * @param {number} pages
 * @param {number} page
 * @param {number} total
 * @param {string} host
 * @param {Array<any>} result
 * @returns {Ipagination}
 */
export function paginate(
	pages: number,
	page: number,
	total: number,
	host: string,
	result: Array<any>,
): Ipagination {
	return {
		total_pages: pages,
		total_items: total,
		next: hasNext(page, pages),
		previous: hasPrevious(page),
		current_page: page,
		items: result,
	};
}
