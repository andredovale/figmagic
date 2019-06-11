import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupColorTokens(frame) {
	if (!frame) {
		throw new Error('No frame for setupColorTokens()!');
  }

  let colors = {};

  for (let color of frame.children) {
    if(!color.name.startsWith('$') || color.type !== 'RECTANGLE') {
      continue;
    }

    console.log(color);

    const colorString = `rgba(${color.fills[0].color.r * 255}, ${color.fills[0].color.g *
      255}, ${color.fills[0].color.b * 255}, ${color.fills[0].color.a * 1})`;

    let normalizedName = camelize(color.name);
    normalizedName = formatName(normalizedName);
    colors[normalizedName] = colorString;
	}

	return colors;
}
