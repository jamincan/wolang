import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/parser.js',
  output: {
    dir: 'lib',
    format: 'esm',
  },
  plugins: [commonjs()],
};
