module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
	preset: "ts-jest",
	testEnvironment: "node"
};
