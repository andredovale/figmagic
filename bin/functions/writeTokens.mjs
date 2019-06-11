import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { processTokens } from './processTokens.mjs';
import { writeFile } from './writeFile.mjs';

export function writeTokens(tokens, format) {
	if (!tokens || tokens.length == 0) {
		throw new Error('Less than one token provided to writeTokens()!');
  }

  for (let token of tokens) {
		let tokenName = camelize(token.name);
    tokenName = formatName(tokenName);

    const processedToken = processTokens(token, tokenName);
    if(processedToken) {
      writeFile(processedToken, 'tokens', tokenName, true, format);
    }
	}
}
