import { Frame } from "../types/frame";

export const recursiveSetup = (
	children: Frame[],
	processItem: (item: Frame) => void
) => {
	for (let item of children) {
		if (item.children) {
			recursiveSetup(item.children, processItem);
			continue;
		}

		processItem(item);
	}
};
