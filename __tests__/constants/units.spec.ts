import { units } from "../../src/constants/units";

test("It should be a object", () => {
	expect(() => {
		units;
	}).toBeInstanceOf(Object);
});
