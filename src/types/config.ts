export type Config = {
	apiBaseUrl: string; // Figma API base URL
	figmaJson: boolean; // Export or not the original JSON from Figma API
	figmaUrl: string; // Figma's file URL param
	figmaToken: string; // Your Figma's user token to connect with API
	figmaTokens: boolean; // Export or not the tokens
	figmaPage: string; // Project page to extract tokens
	format: "css" | "js" | "json" | "sass" | "scss"; // TODO: Output format for tokens
	outputColorFormat: "hexadecimal" | "hsl" | "hsla" | "rgb" | "rgba"; // TODO: Prefered format color to output tokens (work with `token[#].processValue = "color";`)
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
		| "vw"; // TODO: Prefered css unit to output the tokens
	outputFigmaJsonPath: string; // Folder path for the original JSON from Figma API
	outputFigmaJsonName: string; // File name for the original JSON from Figma API
	outputFigmaTokensPath: string; // Folder path for the generated tokens
	outputNameFormat: "camel" | "kebab" | "lower" | "snake" | "start" | "upper"; // Prefered string case to output the tokens keys
	tokens: {
		frameName: string | string[]; // Frame identification name on Figma Page (needed as direct child from page)
		name: string; // Name of the file to output this token
		path: string; // Path of the value for this token, in the same format from `lodash.get`
		fallback?: string; // Used for cases when the path don't exist, but need to return a value to token
		group?: boolean; // If true, group name to be the key
		key?: string; // TODO: The key, sibling of the value on 'path' to be the token key; if group is true, this isn't necessary
		outputColorFormat?: Config["outputColorFormat"]; // Token specific format color
		outputCSSUnit?: Config["outputCSSUnit"]; // Token specific css unit
		outputNameFormat?: Config["outputNameFormat"]; // Token specific string case
		prefix?: string; // String to concatenate before the value of tokens
		processValue?: "color" | "font" | "grid" | "radius" | "shadow"; // Help functions to process the token value
		suffix?: string; // String to concatenate after token's value
		style?: boolean; // Used to named the token;
		styleKey?: "fill" | "text" | "effect" | "grid"; // Select key from style object to find the style key
		type?: "group" | "rectangle" | "text"; // Specify the object type to find the token
	}[];
};
