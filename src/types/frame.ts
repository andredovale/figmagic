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
	style: { [key: string]: any };
	styles: {
		effect: string;
		fill: string;
	};
	type: "GROUP" | "RECTANGLE" | "TEXT";
};
