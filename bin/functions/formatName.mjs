/**
 * Used to clean and format the name of a file
 *
 * @export
 * @param {string} str - The incoming name
 * @returns
 */
export function formatName(str) {
	if (!str) {
		throw new Error('No string for formatName()!');
  }

	const forbiddenCharacters = ['–', '—', '|', '.'];

	let fixedString = str;

  for (let char of forbiddenCharacters) {
		fixedString = fixedString.replace(char, '');
	}

	return fixedString;
}
