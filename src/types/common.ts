export type Json = { err?: string; status?: string; [key: string]: any };

export type WriteFile = (
	file: Json | string,
	path: string,
	name: string,
	isToken?: boolean
) => void;
