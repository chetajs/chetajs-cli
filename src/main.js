import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { makePackage, makeConfig } from './cmds/make';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import { cwd } from 'process';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  // if(fs.existsSync(options.targetDirectory)) {
  //   // console.log(chalk.red.bold('Error'), `Directory ${chalk.yellow.bold(options.projectName)} already exists`)
  //   throw new Error(`Directory ${options.projectName} already exists`)
  // }

 await copy(options.templateDirectory, options.targetDirectory);
 // check options and replace
 /**
  * authService
  * index
  * userModel
  * userService
  * userTokenModel
  */
 if(options.database == 'Sequelize')
 {
  
  const seqTemplateDir = path.join(
    __dirname,
    './../templates/',
    options.template.toLowerCase(),
    'resource',
    'sequelize'
  );

  // create database directory
  
  const dbPath = path.join(
    `${cwd()}`,
    `${options.projectName}/src/database`
  );
  fs.mkdirSync(dbPath);
  fs.writeFile(path.join(dbPath, 'connection.js'), fs.readFileSync(path.join(seqTemplateDir, 'connection.js')), (err) => {
    if(err) {
        console.log(chalk.red.bold('Error'), err)
    }
  })
  
  const servicesPath = path.join(
    `${cwd()}`,
    `${options.projectName}/src/services`
  );

  
  fs.copyFile(path.join(seqTemplateDir, 'userService.js'), path.join(servicesPath, 'userService.js'), (err) => {
    if(err) {
        console.log(chalk.red.bold('Error'), err)
    }
  })

  fs.copyFile(path.join(seqTemplateDir, 'authService.js'), path.join(servicesPath, 'authService.js'), (err) => {
    if(err) {
        console.log(chalk.red.bold('Error'), err)
    }
  })

  // fs.writeFile(path.join(servicesPath, 'authService.js'), fs.readFileSync(path.join(seqTemplateDir, 'authService.js')), (err) => {
  //   if(err) {
  //       console.log(chalk.red.bold('Error'), err)
  //   }
  // })

  const modelsPath = path.join(
    `${cwd()}`,
    `${options.projectName}/src/models`
  );
  await fs.writeFile(path.join(modelsPath, 'userModel.js'), fs.readFileSync(path.join(seqTemplateDir, 'userModel.js')), (err) => {
    if(err) {
        console.log(chalk.red.bold('Error'), err)
    }
  })
  await fs.writeFile(path.join(modelsPath, 'userTokenModel.js'), fs.readFileSync(path.join(seqTemplateDir, 'userTokenModel.js')), (err) => {
    if(err) {
        console.log(chalk.red.bold('Error'), err)
    }
  })

  const srcPath = path.join(
    `${cwd()}`,
    `${options.projectName}/src`
  );
  await fs.writeFile(path.join(srcPath, 'index.js'), fs.readFileSync(path.join(seqTemplateDir, 'index.js')), (err) => {
    if(err) {
        console.log(chalk.red.bold('Error'), err)
    }
  })
 }
 
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  })
  if(result.failed) {
    return Promise.reject(new Error('Failed to initialize git'))
  }
  return
}

export async function createProject(options) {
    options = {
      ...options,
      targetDirectory: `${process.cwd()}\/${options.projectName}`,
    };
   
    // const fullPathName = new URL(import.meta.url).pathname;
    const templateDir = path.resolve(
      __dirname,
      './../templates/',
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

    const tasks = new Listr([
      {
        title: 'Copy project files',
        task: () => copyTemplateFiles(options)
      },
      {
        title: 'Create package.json file',
        task: () => makePackage(options),
      },
      {
        title: 'Create config.json file',
        task: () => makeConfig(options),
      },
      {
        title: 'Initialize git',
        task: () => initGit(options),
        enabled: () => options.git,
      },
      {
        title: 'Install dependencies',
        task: () =>
          projectInstall({
            cwd: options.targetDirectory,
          }),
        skip: () =>
          !options.runInstall
            ? 'Pass --install to automatically install dependencies'
            : undefined,
      },
    ]);
    
    await tasks.run()
    console.log('%s Project ready', chalk.green.bold('DONE'));
    console.log(`
    
    Next Steps:
    - Edit the .env file to setup your db and mail provider
`)
    return true;
}