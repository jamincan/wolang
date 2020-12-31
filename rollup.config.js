import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/parser.js',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'parser',
  },
  plugins: [
    commonjs(),
    babel({
      babelHelpers: 'bundled',
    }),
  ],
};
