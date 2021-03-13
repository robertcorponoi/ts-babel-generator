#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');
const program = require('commander');

const files = require('./files');
const pkg = require('../package.json');

let projectName;

// Sets the program version from the version specified in the project's
// package.json file. This is used when the -v, --version command is used.
program.version(pkg.version);

// The name of the project has to be specified as an argument and we take the
// value passed and save it to `projectName.`
program.arguments('<name>').action(name => projectName = name);

/**
 * Defines the options that can be passed to the cli.
 * 
 * -w, --webpack    Indicates webpack should be added to the project.
 * -r, --rollup     Indicates rollup should be added to the project.
 * -s, --silent     Indicates whether output should be hidden or not.
 */
program.option('-w, --webpack', 'Indicates webpack should be added to the project', false);
program.option('-r, --rollup', 'Indicates rollup should be added to the project', false);
program.option('-g, --git', 'Indicates that this project is going to be using git and adds a .gitignore file to it', true);
program.option('-c, --changelog', 'Creates a basic CHANGELOG file', true);
program.option('-s, --silent', 'Indicates whether output should be hidden or not', true);

/**
 * Parses the command line arguments, creates the necessary directory structure
 * and adds any additional components specified by the options.
 * 
 * @async
 */
const main = async () => {
    // Parse the command line arguments and save the options passed or default
    // values for any options that have default values.
    program.parse(process.argv);
    const options = program.opts();

    // Create the project dir.
    const projectDir = path.resolve(process.cwd(), projectName);
    fs.ensureDirSync(projectDir);

    // Change to the project directory.
    process.chdir(projectDir);

    // Create an new npm project at the project directory, parse it as JSON,
    // then change the project name to the specified project name. Lastly we
    // write the package.json back to the project directory.
    await execa('npm', ['init', '-y']);
    const packageJSONDir = path.resolve(projectDir, 'package.json');
    const packageJSON = require(packageJSONDir);
    packageJSON.name = projectName;

    // Create the src directory along with the starting src/index.ts file.
    const srcDir = path.resolve(projectDir, 'src');
    fs.ensureDirSync(srcDir);
    fs.ensureFileSync(path.resolve(srcDir, 'index.ts'));

    // Create the .babelrc file in the project dir with the static contents.
    const babelDir = path.resolve(projectDir, '.babelrc');
    fs.writeFileSync(babelDir, JSON.stringify(files.babelRC(), null, 1));

    // If the git option is used, which is true by default, we create the
    // .gitignore file.
    if (options.git) fs.writeFileSync(path.resolve(projectDir, '.gitignore'), files.gitignore());

    // If the changelog flag is used, which is true by default, we create the
    // CHANGELOG.md file.
    if (options.changelog) fs.writeFileSync(path.resolve(projectDir, 'CHANGELOG.md'), files.changelog());

    if (options.webpack) {
        // If the webpack flag is used, we want to add the webpack build script
        // to the package.json and create the webpack.config.js file.
        packageJSON.scripts.bundle = 'webpack';

        const webpackConfigDir = path.resolve(projectDir, 'webpack.config.js');
        fs.writeFileSync(webpackConfigDir, files.webpackConfig());
    }

    if (options.rollup) {
        // If the rollup flag is used, we want to add the rollup build script
        // to the package.json and create the rollup.config.js file.
        packageJSON.module = `${projectName}.js`;
        packageJSON.scripts.bundle = 'rollup -c';
        packageJSON.scripts['bundle:watch'] = 'rollup -c --watch';

        const rollupConfigDir = path.resolve(projectDir, 'rollup.config.js');
        fs.writeFileSync(rollupConfigDir, files.rollupConfig());
    }

    // Before we run `npm install` in the project dir, we need to write our new
    // `package.json` to the project directory.
    fs.writeFileSync(packageJSONDir, JSON.stringify(packageJSON, null, 1));

    // Install all dependencies.
    await execa('npm', ['install', '--save-dev', 'typescript', '@babel/core', '@babel/cli', '@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread', '@babel/preset-env', '@babel/preset-typescript', '@babel/plugin-proposal-numeric-separator']);

    // Set up the tsconfig.json file by running the local tsc initialization script.
    await execa('./node_modules/.bin/tsc', ['--init', '--declaration', '--allowSyntheticDefaultImports', '--target', 'esnext', '--outDir', 'lib']);

    // If webpack or rollup is chosen then we have to add those dependencies as well.
    if (options.webpack) await execa('npm', ['install', '--save-dev', 'webpack', 'webpack-cli', 'babel-loader']);
    if (options.rollup) await execa('npm', ['install', '--save-dev', 'rollup', '@rollup/plugin-babel', '@rollup/plugin-node-resolve', '@rollup/plugin-commonjs']);
};

main();