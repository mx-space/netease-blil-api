//@ts-check
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

// import esbuild from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'

// import { babel } from '@rollup/plugin-babel'

import peerDepsExternal from 'rollup-plugin-peer-deps-external'
const dir = 'build'

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: 'src/music.ts',

    output: [
      {
        file: dir + '/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: dir + '/index.cjs.min.js',
        format: 'cjs',
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: dir + '/index.esm.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: dir + '/index.esm.min.js',
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs({ include: 'node_modules/**' }),
      typescript({ tsconfig: './tsconfig.json', declaration: false }),
      // @ts-ignore
      peerDepsExternal(),
    ],

    treeshake: true,
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'build/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]

export default config
