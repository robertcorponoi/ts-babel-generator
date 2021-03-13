'use strict'

const path = require('path');
const chai = require('chai');
const execa = require('execa');
const fs = require('fs-extra');
const pkg = require('../package.json');

after(function (done) {
    this.timeout(30000);

    fs.removeSync(path.resolve(__dirname, '..', 'testproject'));
    fs.removeSync(path.resolve(__dirname, '..', 'testprojectwebpack'));
    fs.removeSync(path.resolve(__dirname, '..', 'testprojectrollup'));

    done();
});

describe('Testing CLI commands', () => {
    it('should print the correct version of the program', async () => {
        const cmd = await execa('node', ['src/ts-babel-generator', '-V']);

        chai.expect(cmd.stdout).to.equal(pkg.version);
    });

    it('should create a basic project', async function () {
        this.timeout(30000);

        await execa('node', ['src/ts-babel-generator', 'testproject', '-s']);

        const dir = path.resolve(__dirname, '..', 'testproject');

        const srcFolderExists = fs.existsSync(path.resolve(dir, 'src'));
        const indexFileExists = fs.existsSync(path.resolve(dir, 'src', 'index.ts'));

        const gitFileExists = fs.existsSync(path.resolve(dir, '.gitignore'));
        const babelrcExists = fs.existsSync(path.resolve(dir, '.babelrc'));
        const tsConfigExists = fs.existsSync(path.resolve(dir, 'tsconfig.json'));

        chai.expect(srcFolderExists).to.be.true;
        chai.expect(indexFileExists).to.be.true;
        chai.expect(gitFileExists).to.be.true;
        chai.expect(babelrcExists).to.be.true;
        chai.expect(tsConfigExists).to.be.true;
    });

    it('should create a basic project with webpack', async function () {
        this.timeout(30000);

        await execa('node', ['src/ts-babel-generator', 'testprojectwebpack', '-w', '-s']);

        const dir = path.resolve(__dirname, '..', 'testprojectwebpack');
        const webpackConfigExists = fs.existsSync(path.resolve(dir, 'webpack.config.js'));

        chai.expect(webpackConfigExists).to.be.true;
    });

    it('should create a basic project with rollup', async function () {
        this.timeout(30000);

        await execa('node', ['src/ts-babel-generator', 'testprojectrollup', '-r', '-s']);

        const dir = path.resolve(__dirname, '..', 'testprojectrollup');
        const rollupConfigExists = fs.existsSync(path.resolve(dir, 'rollup.config.js'));

        chai.expect(rollupConfigExists).to.be.true;
    });
});