'use strict'

const path = require('path');
const chai = require('chai');
const fs = require('fs-extra');
const shell = require('shelljs');
const pkg = require('../package.json');

after(function(done) {
  this.timeout(300000);

  fs.removeSync(path.resolve(__dirname, '..', 'testproject'));
  fs.removeSync(path.resolve(__dirname, '..', 'testprojectwebpack'));
  fs.removeSync(path.resolve(__dirname, '..', 'testprojectrollup'));

  done();
});

describe('Testing CLI commands', () => {
  it('should print the correct version of the program', done => {
    const cmd = shell.exec('node src/ts-babel-generator -V', { async: true });

    cmd.stdout.on('data', data => {
      chai.expect(data).to.equal(pkg.version + '\n');

      done();
    });
  });

  it('should create a basic project', function (done) {
    this.timeout(140000);

    shell.exec('node src/ts-babel-generator testproject -s', { async: true });

    setTimeout(() => {
      const dir = path.resolve(__dirname, '..', 'testproject');

      const srcFolderExists = fs.existsSync(path.resolve(dir, 'src'));
      const indexFileExists = fs.existsSync(path.resolve(dir, 'src', 'index.ts'));

      const babelrcExists = fs.existsSync(path.resolve(dir, '.babelrc'));
      const tsConfigExists = fs.existsSync(path.resolve(dir, 'tsconfig.json'));

      chai.expect(srcFolderExists).to.be.true && chai.expect(indexFileExists).to.be.true && chai.expect(babelrcExists).to.be.true && chai.expect(tsConfigExists).to.be.true;

      done();
    }, 120000);
  });

  it('should create a basic project with webpack', function (done) {
    this.timeout(140000);

    shell.exec('node src/ts-babel-generator testprojectwebpack -w -s', { async: true });

    setTimeout(() => {
      const dir = path.resolve(__dirname, '..', 'testprojectwebpack');

      const webpackConfigExists = fs.existsSync(path.resolve(dir, 'webpack.config.js'));

      chai.expect(webpackConfigExists).to.be.true;

      done();
    }, 120000);
  });

  it('should create a basic project with rollup', function (done) {
    this.timeout(140000);

    shell.exec('node src/ts-babel-generator testprojectrollup -r -s', { async: true });

    setTimeout(() => {
      const dir = path.resolve(__dirname, '..', 'testprojectrollup');

      const rollupConfigExists = fs.existsSync(path.resolve(dir, 'rollup.config.js'));

      chai.expect(rollupConfigExists).to.be.true;

      done();
    }, 120000);
  });
});