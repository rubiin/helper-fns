import rubiin from "@antfu/eslint-config";

export default rubiin({
  stylistic: {
    semi: true,
    quotes: "double",
  }, // enable stylistic rules
  yaml: true, // enable yaml rules,
  jsonc: true, // enable jsonc rules
  markdown: true, // enable markdown rules
  gitignore: true, // enable gitignore rules,
  typescript: {
    tsconfigPath: "tsconfig.json"
    },
  overrides: {
    test: {
      "ts/unbound-method": "off"
    },
    typescript:
    {
      "ts/no-misused-promises": [
				"error",
				{
					checksVoidReturn: false,
				},
			],
      "ts/no-floating-promises":["error",{
        "ignoreIIFE": true
      }],
      "no-console": ["error",{
        allow: ["time","timeEnd"]
      }],
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          ignore: [
            "\\.e2e*",
            "\\.spec*",
            "\\.decorator*",
            "\\*idx*",
          ],
          allowList: {
            ProcessEnv: true,
            UUIDParam: true,
          },
        },
      ],
    },
  },
});
