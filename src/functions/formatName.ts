export const formatName = (string: string): string => {
	if (!string) throw new Error("No string for formatName()!");

	const forbiddenCharacters = ["–", "—", "|", "."];

	for (let char of forbiddenCharacters) {
		string = string.replace(char, "");
	}

	return string;
};
