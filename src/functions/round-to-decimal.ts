export const roundToDecimal = (value: number, decimals?: number): number => {
	if (
		(typeof Number(value) === "number" && value < 0) ||
		(typeof Number(value) !== "number" && !value)
	)
		throw new Error("No number value provided to roundNumber()!");

	if (!decimals) decimals = 0;

	return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
};
