import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { makePackage } from './cmds/make';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
 return copy(options.templateDirectory, options.targetDirectory, {
   clobber: false,
 });
}

export async function createProject(options) {
    options = {
      ...options,
      targetDirectory: `${process.cwd()}\/${options.projectName}`,
    };
   
    const fullPathName = new URL(import.meta.url).pathname;
    const templateDir = path.resolve(
      fullPathName.substring(1),
      '../../templates/',
      options.template.toLowerCase(),
      'project-files'
    );
    options.templateDirectory = templateDir;
   
    try {
      await access(templateDir, fs.constants.R_OK);
    } catch (err) {
      console.log(chalk.red(err))
      console.error('%s Invalid template name', chalk.red.bold('ERROR'));
      process.exit(1);
    }
    console.log('Copy project files');
    await copyTemplateFiles(options);

    // create package.json
    console.log('Generate package.json file');
    makePackage(options)

    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}