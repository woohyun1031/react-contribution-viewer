import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs'];

const config = [
  {
    external: [/node_modules/],
    input: './src/index.tsx',
    output: [
      {
        dir: './dist',
        format: 'cjs',
        sourcemap: true,
        interop: 'auto',
        preserveModules: true,
        preserveModulesRoot: 'src',
        banner: `'use client';`,
      },
    ],
    plugins: [
      nodeResolve({ extensions }),
      postcss({
        extract: false,
        inject: (cssVariableName) =>
          `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`,
        modules: true,
        sourceMap: false,
        use: ['sass'],
      }),
      commonjs({ include: 'node_modules/**' }),
      babel({
        exclude: 'node_modules/**',
        extensions,
        include: ['src/**/*'],
        presets: ['@babel/preset-env', '@babel/preset-react'],
        babelHelpers: 'bundled',
      }),
      peerDepsExternal(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        exclude: ['**/__tests__', '**/*.test.ts'],
      }),
    ],
  },
];

export default config;
