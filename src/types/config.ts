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
	tokens: {
		frameName: string; // frame identification name on Figma Page, direct son of the Page
		group: boolean; // if true, group name to be the key
		key: string; // the key, sibling of the value on 'path' to be the token key; if group = true, this isn't necessary
		name: string; // name of the file to output this token
		outputColorFormat?: Config["outputColorFormat"];
		outputCSSUnit?: Config["outputCSSUnit"];
		outputNameFormat?: Config["outputNameFormat"];
		path: string; // path of the value for this token
		prefix?: string;
		processValue?: "color" | "shadow";
		suffix?: string;
		style: boolean; // use style id to generate the token
		styleKey: "fill" | "text" | "effect" | "grid"; // select the key from style object to find the style id
	}[];
};
