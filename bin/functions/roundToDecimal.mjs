/**
 * Round numbers to decimal point.
 *
 * @export
 * @param {value} value - The number value.
 * @param {decimals} decimals - Round to specific decimal point.
 * @returns
 */
export function roundToDecimal(value, decimals) {
	if (!value) {
		throw new Error('No number value provided to roundNumber()!');
	}

	if (!decimals) {
		throw new Error('No decimals value provided to roundNumber()!');
	}

	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
