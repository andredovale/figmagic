import { SIZES_PX, SIZES_REM } from "../../src/constants/units";

test("It should SIZES_PX be greater than zero", () => {
	expect(SIZES_PX).toBeGreaterThan(0);
});

test("It should SIZES_REM be greater than zero", () => {
	expect(SIZES_REM).toBeGreaterThan(0);
});
