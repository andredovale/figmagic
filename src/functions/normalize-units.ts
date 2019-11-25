import { SIZES_PX, SIZES_REM } from "../constants/units";

export const normalizeUnits = (
	value: number,
	currentUnit: "px" | "percent",
	newUnit: "em" | "rem" | "unitless"
): string | void => {
	if (!value || !currentUnit || !newUnit)
		throw new Error("Missing parameters for normalizeUnits()!");

	let rootSize;
	let unitSize;

	if (currentUnit === "px") rootSize = SIZES_PX;

	if (currentUnit === "percent") rootSize = SIZES_PX;

	if (newUnit === "rem" || newUnit === "em") unitSize = SIZES_REM;

	if (newUnit === "unitless") unitSize = value / 100;

	if (rootSize && unitSize) {
		if (newUnit === "unitless") return String(unitSize);

		const adjustedValue = value * (rootSize / unitSize);
		return `${adjustedValue}${newUnit}`;
	}

	throw new Error(
		"normalizeUnits(): rootSize and/or unitSize variables are either undefined or not incoming as px values."
	);
};
