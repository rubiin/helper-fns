import rubiin from '@rubiin/eslint-config'

export default rubiin({
  stylistic: true, // enable stylistic formatting rules
  typescript: {
    tsconfigPath: 'tsconfig.json', // path to tsconfig.json
  }
},
{
  rules: {
    "no-console": ["error", { allow: ["time", "timeEnd"] }],
    "ts/no-unsafe-member-access": "off",
  },
},
)
