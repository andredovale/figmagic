export type Config = {
	apiBaseUrl: string;
	figmaJson: boolean;
	figmaUrl: string;
	figmaToken: string;
	figmaTokens: boolean;
	figmaPage: string;
	format: "css" | "js" | "json" | "sass" | "scss";
	outputColorFormat: "hexadecimal" | "hsl" | "hsla" | "rgb" | "rgba";
	outputCSSUnit:
		| "cm"
		| "in"
		| "mm"
		| "pc"
		| "pt"
		| "px"
		| "ch"
		| "em"
		| "ex"
		| "percent"
		| "rem"
		| "vh"
		| "vmax"
		| "vmin"
		| "vw";
	outputNameFormat: "camel" | "kebab" | "lower" | "snake" | "start" | "upper";
	recursive: boolean;
	tokens: {
		frameName: string;
		name: string;
		outputColorFormat?: Config["outputColorFormat"];
		outputCSSUnit?: Config["outputCSSUnit"];
		outputNameFormat?: Config["outputNameFormat"];
		path: string;
		prefix?: string;
		postfix?: string;
		recursive?: Config["recursive"];
	}[];
};
