import _camelCase from "lodash/camelCase";
import _kebabCase from "lodash/kebabCase";
import _lowerCase from "lodash/lowerCase";
import _snakeCase from "lodash/snakeCase";
import _startCase from "lodash/startCase";
import _upperCase from "lodash/upperCase";
import { config } from "../config";
import { Config } from "../types/config";

const { outputNameFormat } = config;

const parseStringFormat = {
	camel: _camelCase,
	kebab: _kebabCase,
	lower: _lowerCase,
	snake: _snakeCase,
	start: _startCase,
	upper: _upperCase
};

const stringParser = (
	string: string,
	tokenOutputNameFormat?: Config["outputNameFormat"]
) => parseStringFormat[tokenOutputNameFormat || outputNameFormat](string);

export { stringParser };
