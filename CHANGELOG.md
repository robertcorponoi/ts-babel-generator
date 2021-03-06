## 1.4.1 / 2020-03-13
- [FEATURE] Added logs.

## 1.4.0 / 2020-03-13
- [FEATURE] Replaced shelljs with execa.
- [FEATURE] Refactored the main function to remove using static package.json contents.
- [FEATURE] Padded month/day if below 10 in generated CHANGELOG file.
- [HOTFIX] Fixed issue with tsconfig not being generated.
- [HOTFIX] Fixed issue with package.json formatting.
- [MISC] Improved tests

## 1.3.0 / 2020-10-06
- [FEATURE] Added repository, typings, and module fields to package.json.
- [HOTFIX] Fixed an issue with tsconfig file not being created.
- [MISC] Updated out-of-date dependencies to their latest versions.

## 1.2.3 / 2020-04-16
- [MISC] Updated out-of-date dependencies to their latest versions which also fixed the fixed security vulnerabilities.

## 1.2.2 / 2020-02-26
- [HOTFIX] Small change to fix spacing issue in CHANGELOG.

## 1.2.1 / 2020-02-26
- [HOTFIX] Fixed changelog flag writing the function itself to the CHANGELOG file instead of the returned value of the function.

## 1.2.0 / 2020-02-26
- [FEATURE] Added flag for creating basic CHANGELOG file.
- [MISC] Updated out of date dependencies to their latest versions.

## 1.1.0 / 2020-02-12
- [FEATURE] For rollup, replaced the rollup-plugin-commonjs and rollup-plugin-node-resolve with @rollup/plugin-commonjs and @rollup/plugin-node-resolve.
- [MISC] Updated dependencies to their latest versions.
- [MISC] Changed CHANGELOG format.
- [MISC] Updated license year to reflect year change.

## 1.0.0 / 2019-12-30
- [FEATURE] Removed the -n, --name option and made the project name into an argument.
- [MISC] Updated dependencies to their latest versions.
- [MISC] Added more badges to README.
- [MISC] Updated README to match latest API.
- [MISC] Updated testing to match latest API.
- [MISC] Removed table of contents from README as it's too short to need one.
- [MISC] Added logo.

## 0.3.2 / 2019-11-05
- [MISC] Updated dependencies to their latest versions.

## 0.3.1 / 2019-09-30
- [HOTFIX] Removed traces of ava that caused errors on install.

## 0.3.0 / 2019-09-30
- [HOTFIX] Removed ts imports since we're not using ts (yet).
- [FEATURE] Created a files module to hold string/object representations of files.
- [FEATURE] Added tests to make sure errors were fixed.

## 0.2.0 / 2019-08-27
- [HOTFIX] Added the webpack and rollup install scripts

## 0.1.1 / 2019-08-26
- [FEATURE] Added a flag to allow adding a .gitignore file to the project

## 0.1.0 / 2019-08-26
- Initial release
