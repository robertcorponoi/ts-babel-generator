'use strict'

const path = require('path');
const chai = require('chai');
const fs = require('fs-extra');
const shell = require('shelljs');
const pkg = require('../package.json');

describe('Testing CLI commands', () => {

  after(() => fs.removeSync(path.resolve(__dirname, '..', 'helloworld')));

  it('should print the correct version of the program', done => {

    const cmd = shell.exec('node src/ts-babel-generator -V', { async: true });

    cmd.stdout.on('data', data => {

      chai.expect(data).to.equal(pkg.version + '\n');

      done();

    });

  });

  it('should create the correct project structure for a project with just a name', function (done) {

    this.timeout(60000);

    shell.exec('node src/ts-babel-generator.js -n helloworld -s', { async: true });

    setTimeout(() => {

      const dir = path.resolve(__dirname, '..', 'helloworld');

      const nodeModules = fs.existsSync(path.resolve(dir, 'node_modules'));

      const src = fs.existsSync(path.resolve(dir, 'src'));

      const indexTs = fs.existsSync(path.resolve(dir, 'src', 'index.ts'));

      const packageJSON = fs.existsSync(path.resolve(dir, 'package.json'));

      const packageLockJSON = fs.existsSync(path.resolve(dir, 'package-lock.json'));

      const babelRC = fs.existsSync(path.resolve(dir, '.babelrc'));

      const tsConfig = fs.existsSync(path.resolve(dir, 'tsconfig.json'));

      chai.expect(nodeModules).to.be.true &&

        chai.expect(src).to.be.true &&

        chai.expect(src).to.be.true &&

        chai.expect(indexTs).to.be.true &&

        chai.expect(packageJSON).to.be.true &&

        chai.expect(packageLockJSON).to.be.true &&

        chai.expect(babelRC).to.be.true &&

        chai.expect(tsConfig).to.be.true;

      done();

    }, 50000);

  });

  it('should create the correct project structure for a project with webpack', function (done) {

    this.timeout(60000);

    shell.exec('node src/ts-babel-generator.js -n helloworld -s -w', { async: true });

    setTimeout(() => {

      const dir = path.resolve(__dirname, '..', 'helloworld');

      const nodeModules = fs.existsSync(path.resolve(dir, 'node_modules'));

      const src = fs.existsSync(path.resolve(dir, 'src'));

      const indexTs = fs.existsSync(path.resolve(dir, 'src', 'index.ts'));

      const packageJSON = fs.existsSync(path.resolve(dir, 'package.json'));

      const packageLockJSON = fs.existsSync(path.resolve(dir, 'package-lock.json'));

      const babelRC = fs.existsSync(path.resolve(dir, '.babelrc'));

      const tsConfig = fs.existsSync(path.resolve(dir, 'tsconfig.json'));

      const webpackConfig = fs.existsSync(path.resolve(dir, 'webpack.config.js'));

      chai.expect(nodeModules).to.be.true &&

        chai.expect(src).to.be.true &&

        chai.expect(src).to.be.true &&

        chai.expect(indexTs).to.be.true &&

        chai.expect(packageJSON).to.be.true &&

        chai.expect(packageLockJSON).to.be.true &&

        chai.expect(babelRC).to.be.true &&

        chai.expect(tsConfig).to.be.true &&

        chai.expect(webpackConfig).to.be.true;

      done();

    }, 50000);

  });

  it('should create the correct project structure for a project with rollup', function (done) {

    this.timeout(60000);

    shell.exec('node src/ts-babel-generator.js -n helloworld -s -r', { async: true });

    setTimeout(() => {

      const dir = path.resolve(__dirname, '..', 'helloworld');

      const nodeModules = fs.existsSync(path.resolve(dir, 'node_modules'));

      const src = fs.existsSync(path.resolve(dir, 'src'));

      const indexTs = fs.existsSync(path.resolve(dir, 'src', 'index.ts'));

      const packageJSON = fs.existsSync(path.resolve(dir, 'package.json'));

      const packageLockJSON = fs.existsSync(path.resolve(dir, 'package-lock.json'));

      const babelRC = fs.existsSync(path.resolve(dir, '.babelrc'));

      const tsConfig = fs.existsSync(path.resolve(dir, 'tsconfig.json'));

      const rollupConfig = fs.existsSync(path.resolve(dir, 'rollup.config.js'));

      chai.expect(nodeModules).to.be.true &&

        chai.expect(src).to.be.true &&

        chai.expect(src).to.be.true &&

        chai.expect(indexTs).to.be.true &&

        chai.expect(packageJSON).to.be.true &&

        chai.expect(packageLockJSON).to.be.true &&

        chai.expect(babelRC).to.be.true &&

        chai.expect(tsConfig).to.be.true &&

        chai.expect(rollupConfig).to.be.true;

      done();

    }, 50000);

  });

});