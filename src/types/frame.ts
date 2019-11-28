type Color = { r: number; g: number; b: number; a: number };

export type Frame = {
	children?: Frame[];
	absoluteBoundingBox: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
	characters: string;
	cornerRadius: number;
	effects: {
		offset: {
			x: number;
			y: number;
		};
		radius: number;
		color: Color;
	}[];
	fills: { color: Color }[];
	name: string;
	rectangleCornerRadii: number[];
	strokeWeight: number;
	strokes: {
		type: string;
	}[];
	style: {
		fontFamily: string;
		fontPostScriptName: string;
		fontSize: number;
		fontWeight: number;
		lineHeightPx: number;
	};
	styles: {
		effect: string;
		fill: string;
	};
	type: "GROUP" | "RECTANGLE" | "TEXT";
};
