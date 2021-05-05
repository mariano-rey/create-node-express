#! /usr/bin/env node
const yargs = require('yargs')
const path = require('path')
const fs = require('fs-extra')
const { execSync } = require('child_process')

console.log('Copy files and folders...\n')
// yargs.usage(title).help(true).argv
// const options = yargs.usage(usage).option('l', { alias: 'languages', describe: 'List all supported languages.', type: 'boolean', demandOption: false }).help(true).argv

const templateDir = path.join(__dirname, '../template')
const destDir = process.cwd()

fs.mkdirSync(`${destDir}/src`)
fs.copySync(`${templateDir}/src`, `${destDir}/src`)
fs.copySync(`${templateDir}/.env`, `${destDir}/.env`)
fs.copySync(`${templateDir}/.eslintignore`, `${destDir}/.eslintignore`)
fs.copySync(`${templateDir}/.eslintrc.js`, `${destDir}/.eslintrc.js`)
fs.copySync(`${templateDir}/.prettierignore`, `${destDir}/.prettierignore`)
fs.copySync(`${templateDir}/.prettierrc.json`, `${destDir}/.prettierrc.json`)
fs.copySync(`${templateDir}/nodemon.json`, `${destDir}/nodemon.json`)
fs.copySync(`${templateDir}/package.json`, `${destDir}/package.json`)
fs.copySync(`${templateDir}/tsconfig.json`, `${destDir}/tsconfig.json`)

console.log('Installing packages...')
execSync('npm i', { stdio: [0, 1, 2] })
