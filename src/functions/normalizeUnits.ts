import { units } from "../constants/units";

export const normalizeUnits = (
	value: number,
	currentUnit: "px" | "percent",
	newUnit: "em" | "rem" | "unitless"
): string | void => {
	if (!value || !currentUnit || !newUnit)
		throw new Error("Missing parameters for normalizeUnits()!");

	let rootSize;
	let unitSize;

	if (currentUnit === "px") rootSize = units.globalPxSize;

	if (currentUnit === "percent") rootSize = units.globalPxSize;

	if (newUnit === "rem" || newUnit === "em") unitSize = units.globalRemSize;

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
