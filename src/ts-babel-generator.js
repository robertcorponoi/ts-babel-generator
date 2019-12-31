#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');
const program = require('commander');

const files = require('./files');
const pkg = require('../package.json');

let projectName;

/**
 * Set the program version from the current version of ts-babel-generator from package.json
 */
program.version(pkg.version);

/**
 * Define the name of the project to create as an argument.
 */
program.arguments('<name>').action(name => projectName = name);

/**
 * Define the options that can be passed to the cli.
 * 
 * -w, --webpack    Indicates webpack should be added to the project.
 * -r, --rollup     Indicates rollup should be added to the project.
 * -o, --output     The path to the directory to output the project to.
 * -s, --silent     Indicates whether output should be hidden or not.
 */
program.option('-w, --webpack', 'Indicates webpack should be added to the project', false);
program.option('-r, --rollup', 'Indicates rollup should be added to the project', false);
program.option('-g, --git', 'Indicates that this project is going to be using git and adds a .gitignore file to it', true);
program.option('-o, --output <path>', 'The path to the directory to output the project to', process.cwd());
program.option('-s, --silent', 'Indicates whether output should be hidden or not', true);

program.parse(process.argv);

/**
 * Get the references to the Objects needed for the configuration files.
 */
const pkgJSON = files.pkgJSON(projectName);
const babelRC = files.babelRC();

const projectDir = path.resolve(program.output, projectName);

const pkgJSONDir = path.resolve(projectDir, 'package.json');
const babelDir = path.resolve(projectDir, '.babelrc');

const srcDir = path.resolve(projectDir, 'src');

/**
 * Generate the base structure of the project.
 */
if (!program.silent) console.info('Generating project structure...');

fs.ensureDirSync(projectDir);
fs.ensureDirSync(srcDir);

fs.ensureFileSync(path.resolve(srcDir, 'index.ts'));

/**
 * If the git flag was supplied, create the .gitignore file from the string representation of it.
 */
//if (program.git) fs.writeFileSync(path.resolve(projectDir, '.gitignore'), files.gitignore());

/**
 * Create and write webpack/rollup configuration files if requested.
 */
if (program.webpack) {
  const webpackConfig = files.webpackConfig();

  pkgJSON.scripts.bundle = 'webpack';

  const webpackConfigDir = path.resolve(projectDir, 'webpack.config.js');

  if (!program.silent) console.info('Adding webpack...');

  fs.writeFileSync(webpackConfigDir, webpackConfig);
}

if (program.rollup) {
  const rollupConfig = files.rollupConfig();

  pkgJSON.scripts.bundle = 'rollup -c';
  pkgJSON.scripts['bundle:watch'] = 'rollup -c --watch';

  pkgJSON.module = `${projectName}.js`;

  const rollupConfigDir = path.resolve(projectDir, 'rollup.config.js');

  if (!program.silent) console.info('Adding rollup...');

  fs.writeFileSync(rollupConfigDir, rollupConfig);
}

/**
 * Write all of the files we can at this point.
 */
if (!program.silent) if (!program.silent) console.info('Writing package.json and .babelrc files...');
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
if (!program.silent) console.info('Installing dependencies...');
shell.exec('npm install --save-dev typescript @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/preset-env @babel/preset-typescript @babel/plugin-proposal-numeric-separator', { silent: true });

/**
 * Install any other dependencies that are needed.
 */
if (program.webpack) shell.exec('npm install --save-dev webpack webpack-cli babel-loader');
if (program.rollup) shell.exec('npm install --save-dev rollup rollup-plugin-babel@latest rollup-plugin-node-resolve rollup-plugin-commonjs');

/**
 * Set up the initial tsconfig.json config file.
 */
if (!program.silent) console.info('Creating tsconfig.json file...');
shell.exec('npm run tsconfig', { silent: true });

if (!program.silent) console.info('Finished!');