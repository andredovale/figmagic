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
		| "vw"; // TODO: Prefered css unit to output tokens
	outputFigmaJsonPath: string; // Folder's path of the original JSON file from Figma Api
	outputFigmaJsonName: string; // Name of the original JSON file from Figma API
	outputFigmaTokensPath: string; // Generated tokens folder's path
	outputNameFormat: "camel" | "kebab" | "lower" | "snake" | "start" | "upper"; // String case prefered to output tokens keys
	tokens: {
		frameName: string | string[]; // Frame's name on Figma page (required as direct child from page)
		name: string; // File name to output this token
		path: string; // Value's path of this token. "lodash.get" same format
		fallback?: string; // Used when the path doesn't exists, but need to return a value to this token
		group?: boolean; // If true, group name will be the token key
		key?: string; // TODO: JSON file key who will be used to give this token a name. This key needs to be a sibling propperty of attribute 'path'
		outputColorFormat?: Config["outputColorFormat"]; // Token specific color format
		outputCSSUnit?: Config["outputCSSUnit"]; // Token specific css unit
		outputNameFormat?: Config["outputNameFormat"]; // Token specific string case
		prefix?: string; // String to concatenate before token's values
		processValue?: "color" | "font" | "grid" | "radius" | "shadow"; // Help functions to process the token value
		suffix?: string; // String to concatenate after token's value
		style?: boolean; // Used to named the token;
		styleKey?: "fill" | "text" | "effect" | "grid"; // Select key from style object to find the style key
		type?: "group" | "rectangle" | "text"; // Specify the object type to find the token
	}[];
};
