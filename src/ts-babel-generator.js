#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');
const program = require('commander');
const pkg = require('../../package.json');

import path from 'path';
import fs from 'fs-extra';
import shell from 'shelljs';
import program from 'commander';
import pkg from '../../package.json';

/**
 * Set the program version from the current version of ts-babel-generator from package.json
 */
program.version(pkg.version);

/**
 * Define the options that can be passed to the cli.
 * 
 * -n, --name     The name of the project to create.
 * -w, --webpack  Indicates webpack should be added to the project.
 * -r, --rollup   Indicates rollup should be added to the project.
 * -o, --output   The path to the directory to output the project to.
 */
program.option('-n, --name <project>', 'The name of the project to create', 'my-project');
program.option('-w, --webpack', 'Indicates webpack should be added to the project', false);
program.option('-r, --rollup', 'Indicates rollup should be added to the project', false);
program.option('-g, --git', 'Indicates that this project is going to be using git and adds a .gitignore file to it', true);
program.option('-o, --output <path>', 'The path to the directory to output the project to', process.cwd());

program.parse(process.argv);

/**
 * Create the configuration files we need.
 */
const pkgJSON = {
  name: program.name,
  version: "0.1.0",
  description: "TODO",
  main: "index.js",
  scripts: {
    "tsconfig": "tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir lib",
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "build": "npm run build:types && npm run build:js",
    "build:types": "tsc --emitDeclarationOnly",
    "build:js": "babel src --out-dir lib --extensions \".ts,.tsx\" --source-maps inline"
  },
  repository: {},
  keywords: [],
  author: '',
  license: 'MIT'
};

const babelRC = {
  presets: [
    "@babel/env",
    "@babel/typescript"
  ],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
};

const projectDir = path.resolve(program.output, program.name);

const pkgJSONDir = path.resolve(projectDir, 'package.json');
const babelDir = path.resolve(projectDir, '.babelrc');

const srcDir = path.resolve(projectDir, 'src');

/**
 * Generate the root directory of the project.
 */
console.info('Generating project structure...');
fs.ensureDirSync(projectDir);
fs.ensureDirSync(srcDir);

fs.ensureFileSync(path.resolve(srcDir, 'index.ts'));

if (program.git) fs.copyFileSync('./.gitignore', projectDir);

/**
 * Create and write webpack/rollup configuration files if requested.
 */
if (program.webpack) {

  const webpackConfig = `const path = require('path');

module.exports = {
  // Change to your "entry-point".
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [{
      // Include ts, tsx, js, and jsx files.
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  }
};`

  pkgJSON.scripts.bundle = 'webpack';

  const webpackConfigDir = path.resolve(projectDir, 'webpack.config.js');

  console.info('Adding webpack...');

  fs.writeFileSync(webpackConfigDir, webpackConfig);

}

if (program.rollup) {

  const rollupConfig = `import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const name = 'RollupTypeScriptBabel';

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),
  ],

  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
  }, {
    file: pkg.browser,
    format: 'iife',
    name,

    // https://rollupjs.org/guide/en#output-globals-g-globals
    globals: {},
  }],
};`

  pkgJSON.scripts.bundle = 'rollup -c';
  pkgJSON.scripts['bundle:watch'] = 'rollup -c --watch';

  pkgJSON.module = `${program.name}.js`;

  const rollupConfigDir = path.resolve(projectDir, 'rollup.config.js');

  console.info('Adding rollup...');

  fs.writeFileSync(rollupConfigDir, rollupConfig);

}

/**
 * Write all of the files we can at this point.
 */
console.info('Writing package.json and .babelrc files...');
fs.writeFileSync(babelDir, JSON.stringify(babelRC));
fs.writeFileSync(pkgJSONDir, JSON.stringify(pkgJSON));

/**
 * Change directories of the process so that we are in the root directory of the project.
 * 
 * This lets us run npm commands inside of the project to set things up more easily.
 */
process.chdir(projectDir);

/**
 * Install the necessary dependencies for typescript and babel.
 */
console.info('Installing dependencies...');
shell.exec('npm install --save-dev typescript @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/preset-env @babel/preset-typescript @babel/plugin-proposal-numeric-separator', { silent: true });

/**
 * Install any other dependencies that are needed.
 */
if (program.webpack) shell.exec('npm install --save-dev webpack webpack-cli babel-loader');
if (program.rollup) shell.exec('npm install --save-dev rollup rollup-plugin-babel@latest rollup-plugin-node-resolve rollup-plugin-commonjs');

/**
 * Set up the initial tsconfig.json config file.
 */
console.info('Creating tsconfig.json file...');
shell.exec('npm run tsconfig', { silent: true });

console.info('Finished!');