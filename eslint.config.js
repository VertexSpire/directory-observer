const { ESLint } = require("eslint");

/**
 * ESLint configuration file
 * @type {ESLint.ConfigData}
 */
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: "@typescript-eslint/parser", // Use @typescript-eslint/parser to parse TypeScript
	parserOptions: {
		ecmaVersion: 12, // Use ECMAScript 2021 features
		sourceType: "module", // Use ECMAScript modules
	},
	plugins: ["@typescript-eslint", "prettier"], // Use Prettier and TypeScript ESLint plugins
	extends: [
		"eslint:recommended", // Use ESLint recommended rules
		"plugin:@typescript-eslint/recommended", // Use TypeScript recommended rules
		"plugin:prettier/recommended", // Use Prettier recommended configuration
	],
	rules: {
		"prettier/prettier": "error", // Show Prettier formatting issues as ESLint errors
		"@typescript-eslint/no-unused-vars": "warn", // Warn for unused variables
		"no-console": "off", // Allow console statements
	},
};

