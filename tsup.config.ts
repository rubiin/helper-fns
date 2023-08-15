import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  format: [
    'esm',
    'cjs',
  ],
  dts: true,
  target: 'es2017',
  clean: true,
  splitting: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
})
