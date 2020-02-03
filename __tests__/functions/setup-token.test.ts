import _get from "lodash/get";

import { setupToken } from "../../src/functions/setup-token";
import { Frame } from "../../src/types/frame";
import { Page } from "../../src/types/page";

describe("It should throw an error", () => {
	test("With frame that not has name from 'frameName'", () => {
		expect(() => {
			setupToken(
				{
					frameName: ["lorem", "ipsum", "dolor"],
					name: "sit",
					path: "amet"
				},
				{
					name: "lorem",
					children: [
						{
							name: "sit"
						} as Frame
					]
				},
				{}
			);
		}).toThrow();
	});

	test("With frame that has name from 'frameName', but without 'children'", () => {
		expect(() => {
			setupToken(
				{
					frameName: ["lorem", "ipsum", "dolor"],
					name: "sit",
					path: "amet"
				},
				{
					name: "lorem",
					children: [
						{
							name: "lorem"
						} as Frame
					]
				},
				{}
			);
		}).toThrow();
	});

	test("With token that has 'style', but without the pair 'styleKey'", () => {
		expect(() => {
			setupToken(
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor",
					style: true
				},
				{
					name: "lorem",
					children: [
						{
							name: "lorem",
							children: [{} as Frame]
						} as Frame
					]
				},
				{}
			);
		}).toThrow();
	});

	test("Without frame on children", () => {
		expect(() => {
			setupToken(
				{
					frameName: "lorem",
					name: "ipsum",
					path: "dolor"
				},
				{ name: "lorem", children: [] },
				{
					lorem: {
						name: "ipsum"
					}
				}
			);
		}).toThrow();
	});
});

describe("It should build the token", () => {
	test("With simple string", () => {
		const executed = setupToken(
			{
				frameName: "lorem",
				name: "ipsum",
				path: "dolor"
			},
			{
				children: [
					({
						children: [{ dolor: "sit" }],
						name: "lorem"
					} as unknown) as Frame
				]
			} as Page,
			{}
		);
		const expected = { sit: "sit" };
		expect(executed).toMatchObject(expected);
	});

	test("With frames that has a different type", () => {
		const executed = setupToken(
			{
				frameName: "lorem",
				name: "ipsum",
				path: "dolor",
				type: "text"
			},
			{
				children: [
					({
						children: [
							{
								dolor: "sit",
								type: "rectangle"
							},
							{
								dolor: "et",
								name: "amet",
								type: "text"
							},
							{ dolor: "lament" }
						],
						name: "lorem"
					} as unknown) as Frame
				]
			} as Page,
			{}
		);
		const expected = { amet: "et" };
		expect(executed).toMatchObject(expected);
	});

	test("With all frames that has a different type", () => {
		const executed = setupToken(
			{
				frameName: "lorem",
				name: "ipsum",
				path: "dolor",
				type: "text"
			},
			{
				children: [
					({
						children: [
							{
								dolor: "sit",
								type: "rectangle"
							},
							{ dolor: "lament" }
						],
						name: "lorem"
					} as unknown) as Frame
				]
			} as Page,
			{}
		);
		const expected = {};
		expect(executed).toEqual(expected);
	});

	test("With token name from style", () => {
		const executed = setupToken(
			{
				frameName: "lorem",
				name: "ipsum",
				path: "dolor",
				style: true,
				styleKey: "text"
			},
			{
				children: [
					({
						children: [
							{
								dolor: "sit",
								styles: {
									text: "123"
								}
							}
						],
						name: "lorem"
					} as unknown) as Frame
				]
			} as Page,
			{
				"123": {
					name: "ipsum"
				}
			}
		);
		const expected = { ipsum: "sit" };
		expect(executed).toMatchObject(expected);
	});

	test("With a preset of 'processToken's", () => {
		const executed = setupToken(
			{
				frameName: "lorem",
				name: "ipsum",
				path: "style",
				processValue: "font"
			},
			{
				children: [
					({
						children: [
							{
								style: {
									loremIpsum: "dolor",
									sitAmet: "et lament"
								},
								name: "font style name"
							}
						],
						name: "lorem"
					} as unknown) as Frame
				]
			} as Page,
			{}
		);
		const expected = {
			"font-style-name": {
				"lorem-ipsum": "dolor",
				"sit-amet": "et lament"
			}
		};
		expect(executed).toMatchObject(expected);
	});

	test("With groupped frames", () => {
		const executed = setupToken(
			{
				frameName: "lorem",
				group: true,
				name: "ipsum",
				path: "dolor"
			},
			{
				children: [
					({
						children: [
							{
								children: [{ dolor: "sit" }],
								type: "GROUP"
							}
						],
						name: "lorem"
					} as unknown) as Frame
				]
			} as Page,
			{}
		);
		const expected = { sit: "sit" };
		expect(executed).toMatchObject(expected);
	});

	test("With inner childrens", () => {
		const executed = setupToken(
			{
				frameName: "lorem",
				name: "ipsum",
				path: "dolor"
			},
			{
				children: [
					({
						children: [
							{
								children: [
									{
										children: [
											{
												children: [{ dolor: "sit" }]
											}
										]
									}
								]
							}
						],
						name: "lorem"
					} as unknown) as Frame
				]
			} as Page,
			{}
		);
		const expected = { sit: "sit" };
		expect(executed).toMatchObject(expected);
	});

	test("With 'children' as path", () => {
		const executed = setupToken(
			{
				frameName: "lorem",
				group: true,
				name: "ipsum",
				path: "children"
			},
			{
				children: [
					({
						children: [
							{
								children: [
									{
										children: [{ dolor: "sit" }]
									}
								]
							}
						],
						name: "lorem"
					} as unknown) as Frame
				]
			} as Page,
			{}
		);
		const expected = {};
		expect(executed).toEqual(expected);
	});
});
