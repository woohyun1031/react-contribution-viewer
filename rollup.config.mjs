import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json' assert { type: 'json' };

const extensions = ['js', 'jsx', 'ts', 'tsx', 'mjs'];

const config = [
  {
    external: [/node_modules/],
    input: './src/index.ts',
    output: [
      {
        dir: './dist',
        format: 'cjs',
        sourcemap: true,
        interop: 'auto',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        file: pkg.module,
        format: 'es',
      },
      {
        name: pkg.name,
        file: pkg.browser,
        format: 'umd',
      },
    ],
    plugins: [
      nodeResolve({ extensions }),
      babel({
        exclude: 'node_modules/**',
        extensions,
        include: ['src/**/*'],
        presets: ['@babel/preset-env', '@babel/preset-react'],
      }),
      commonjs({ include: 'node_modules/**' }),
      peerDepsExternal(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: false,
        inject: (cssVariableName) =>
          `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`,
        modules: true,
        sourceMap: false,
        use: ['sass'],
      }),
    ],
  },
];

export default config;
