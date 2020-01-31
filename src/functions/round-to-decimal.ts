export const roundToDecimal = (value: number, decimals?: number): number => {
	if (Number.isNaN(Number(value)))
		throw new Error("No number value provided to roundNumber()!");

	if (!decimals) decimals = 0;

	return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
};
