<p align="center">
  <img width="250" height="250" src="https://github.com/robertcorponoi/graphics/blob/master/ts-babel-generator/ts-babel-generator-logo.png?raw=true">
</p>

<h1 align="center">Typescript Babel Project Generator</h1>

<p align="center">ts-babel-generator generates a typescript with babel project based on https://github.com/Microsoft/TypeScript-Babel-Starter<p>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/ts-babel-generator.svg?style=flat)](https://www.npmjs.com/package/ts-babel-generator)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/ts-babel-generator/badge.svg)](https://snyk.io/test/github/robertcorponoi/ts-babel-generator)
  ![npm](https://img.shields.io/npm/dt/ts-babel-generator)
  [![NPM downloads](https://img.shields.io/npm/dm/ts-babel-generator.svg?style=flat)](https://www.npmjs.com/package/ts-babel-generator)
  <a href="https://badge.fury.io/js/ts-babel-generator"><img src="https://img.shields.io/github/issues/robertcorponoi/ts-babel-generator.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/ts-babel-generator"><img src="https://img.shields.io/github/license/robertcorponoi/ts-babel-generator.svg" alt="license" height="18"></a>
  [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Why**

I got tired of either having to clone the sample repo provided or run through the steps myself everytime I wanted to set up a project.

## **Install**

To install ts-babel-generator as a global command, you can use:

```shell
$ npm install -g ts-babel-generator
```

## **Usage**

To use ts-babel-generator, you can call the command with the name of the project you want to create like so:

```shell
$ ts-babel-generator helloworld
```

This will create a project called 'helloworld' in the current directory that you are in.

## **Flags**

To customize the output project, you can use a combination of the flags below:

```
ts-babel-generator [options]

-o, --output        Specify the directory to save the the project (current working directory)
-w, --webpack       Indicates whether webpack should be used for this project. (false)
-g, --git           Indicates that this project is going to be using git and adds a .gitignore file to it. (true)
-c, --changelog     Indicates whether a basic CHANGELOG file should be created or not. (true)
-r, --rollup        Indicates whether rollup should be used for this project. (false)
-s, --silent        Indicates whether output should be hidden or not.
```

## **Examples**

Creating a webpack project:

```shell
$ ts-babel-generator hellowebpack -w
```

Creating a rollup project:

```shell
$ ts-babel-generator hellorollup -r
```

## **Test**

To run the tests available, use:

```bash
$ npm run test
```

**Note:** The tests take a while to complete as there are generous timeouts to ensure that files have been created and packages have been installed.

## **License**

MIT