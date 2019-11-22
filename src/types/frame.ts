type Color = { r: number; g: number; b: number; a: number };

export type Frame = {
	name: string;
	children: {
		absoluteBoundingBox: { width: number };
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
	}[];
};
