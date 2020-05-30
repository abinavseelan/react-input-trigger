import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.ts',
  external: [ 'react', 'prop-types', 'textarea-caret' ],
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,

    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs(),
    resolve(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
}
