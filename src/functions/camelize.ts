export const camelize = (string: string): string => {
	if (!string) throw new Error("No string provided to camelize()!");

	return string
		.trim()
		.toLowerCase()
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
			index !== 0 ? letter.toUpperCase() : letter
		)
		.replace(/\s+/g, "");
};
