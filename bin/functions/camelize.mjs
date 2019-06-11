/**
 * Camel-case transform a string
 *
 * @export
 * @param {string} str - The string
 * @returns
 */
export function camelize(str) {
	if (!str) {
		throw new Error('No string provided to camelize()!');
  }

  return str
		.toLowerCase()
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
		})
		.replace(/\s+/g, '');
}
