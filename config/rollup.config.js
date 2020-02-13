
const path = require('path');
const rollup = require('rollup');
const json = require('@rollup/plugin-json');
const babel = require('rollup-plugin-babel');
const { terser } = require("rollup-plugin-terser");
const progress = require('rollup-plugin-progress');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

const extensions = ['.js', '.ts'];

const plugins = [
  resolve({ extensions }),
  babel({ extensions, runtimeHelpers: true }),
  commonjs({ extensions }),
  json(),
  terser(),
  progress()
];

const manualChunks = (id) => {
    if (id.includes('node_modules')) {
      return 'vendor';
    }
}

const inputOptions = {
    input: {'index': path.resolve('libs/index.js')},
    manualChunks: process.env.CLSPRIFIX_ENV !== 'umd' && manualChunks,
    plugins
};

const outputOptions = {
    name: 'clsPrefix',
    dir: process.env.CLSPRIFIX_ENV,
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-[hash].js',
    format: process.env.CLSPRIFIX_ENV,
    compact: false,
    exports: 'named'
}

async function build() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);
    // generate code
    const { output } = await bundle.generate(outputOptions);

    for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === 'asset') {
          // For assets, this contains
          // {
          //   fileName: string,              // the asset file name
          //   source: string | Buffer        // the asset source
          //   type: 'asset'                  // signifies that this is an asset
          // }
        } else {
          // For chunks, this contains
          // {
          //   code: string,                  // the generated JS code
          //   dynamicImports: string[],      // external modules imported dynamically by the chunk
          //   exports: string[],             // exported variable names
          //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
          //   fileName: string,              // the chunk file name
          //   imports: string[],             // external modules imported statically by the chunk
          //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
          //   isEntry: boolean,              // is this chunk a static entry point
          //   map: string | null,            // sourcemaps if present
          //   modules: {                     // information about the modules in this chunk
          //     [id: string]: {
          //       renderedExports: string[]; // exported variable names that were included
          //       removedExports: string[];  // exported variable names that were removed
          //       renderedLength: number;    // the length of the remaining code in this module
          //       originalLength: number;    // the original length of the code in this module
          //     };
          //   },
          //   name: string                   // the name of this chunk as used in naming patterns
          //   type: 'chunk',                 // signifies that this is a chunk
          // }
        }
      }
    
      // or write the bundle to disk
      return await bundle.write(outputOptions);
}

build();

