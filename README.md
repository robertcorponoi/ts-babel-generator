<div align="center">

# Typescript Babel Project Generator

Generates a Typescript with Babel project as described by https://github.com/Microsoft/TypeScript-Babel-Starter

</div>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/ts-babel-generator.svg?style=flat)](https://www.npmjs.com/package/ts-babel-generator)
[![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/ts-babel-generator/badge.svg)](https://snyk.io/test/github/robertcorponoi/ts-babel-generator)
[![NPM downloads](https://img.shields.io/npm/dm/ts-babel-generator.svg?style=flat)](https://www.npmjs.com/package/ts-babel-generator)
<a href="https://badge.fury.io/js/ts-babel-generator"><img src="https://img.shields.io/github/issues/robertcorponoi/ts-babel-generator.svg" alt="issues" height="18"></a>
<a href="https://badge.fury.io/js/ts-babel-generator"><img src="https://img.shields.io/github/license/robertcorponoi/ts-babel-generator.svg" alt="license" height="18"></a>
[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Why**

I got tired of either having to clone the sample repo provided or run through the steps myself everytime I wanted to set up a project.

## **Table of contents**

- [Install](#install)
- [Usage](#usage)
- [Flags](#flags)
- [Examples](#examples)

## **Install**

To install ts-babel-generator as a global command, you can use:

```shell
$ npm install -g ts-babel-generator
```

## **Usage**

To use ts-babel-generator, you can call the command with the name flag to specify the name of the project you want to create like so:

```shell
$ ts-babel-generator -n helloworld
```

This will create a project called 'helloworld' in the current directory you are in.

## **Flags**

To customize linkquest, you can use a combination of the flags below:

```
ts-babel-generator [options]

-n, --name          Specify the name of the project. ('my-project')
-o, --output        Specify the directory to save the the project (current working directory)
-w, --webpack       Indicates whether webpack should be used for this project. (false)
-g, --git           Indicates that this project is going to be using git and adds a .gitignore file to it. (true)
-r, --rollup        Indicates whether rollup should be used for this project. (false)
```

## **Examples**

Creating a webpack project:

```shell
$ ts-babel-generator -n hellowebpack -w
```

Creating a rollup project:

```shell
$ ts-babel-generator -n hellorollup -r
```

## **License**

MIT