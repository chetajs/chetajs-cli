import path from 'path';
import fs from 'fs'
import ejs from 'ejs'
import chalk from 'chalk';
import { toPascalCase } from '../utils/strings'

let fullPathName = new URL(import.meta.url).pathname;
fullPathName = fullPathName.substring(1)

export const generateModel = async (options) => {
    const nameInPascal = toPascalCase(options.name)
    const newFile = path.resolve(
        `${fullPathName}`,
        `../../../todoApp/src/models`, 
        `${options.name}Model.js`
      );
    const templateDir = path.resolve(
        fullPathName,
        `../../../templates/javascript/resource`, `model.ejs`
      );

    
    let file = await ejs.renderFile(templateDir, {_name: options.name, _nameInPascal: nameInPascal})
    if(fs.existsSync(newFile) && !options.forceCreate) {
        console.log(chalk.red.bold('Error'), `${options.name}Model already exists`)
        return
    }
    fs.writeFile(newFile, file, (err) => {
        if(err) {
            console.log(chalk.red.bold('Error'), err)
        } else {
            console.log(chalk.green.bold('Done!'), `${newFile} has been generated`)
        }
    })
}

export const generateController = async (options) => {
    const nameInPascal = toPascalCase(options.name)
    const newFile = path.resolve(
        `${fullPathName}`,
        `../../../todoApp/src/controllers`, 
        `${options.name}Controller.js`
      );
    const templateDir = path.resolve(
        fullPathName,
        `../../../templates/javascript/resource`, `controller.ejs`
      );

    
    let file = await ejs.renderFile(templateDir, {_name: options.name, _nameInPascal: nameInPascal})
    if(fs.existsSync(newFile) && !options.forceCreate) {
        console.log(chalk.red.bold('Error'), `${options.name}Controller already exists`)
        return
    }
    fs.writeFile(newFile, file, (err) => {
        if(err) {
            console.log(chalk.red.bold('Error'), err)
        } else {
            console.log(chalk.green.bold('Done!'), `${newFile} has been generated`)
        }
    })
}

export const generateService = async (options) => {
    const nameInPascal = toPascalCase(options.name)
    const newFile = path.resolve(
        `${fullPathName}`,
        `../../../todoApp/src/services`, 
        `${options.name}Service.js`
      );
    const templateDir = path.resolve(
        fullPathName,
        `../../../templates/javascript/resource`, `service.ejs`
      );

    
    let file = await ejs.renderFile(templateDir, {_name: options.name, _nameInPascal: nameInPascal})
    if(fs.existsSync(newFile) && !options.forceCreate) {
        console.log(chalk.red.bold('Error'), `${options.name}Service already exists`)
        return
    }
    fs.writeFile(newFile, file, (err) => {
        if(err) {
            console.log(chalk.red.bold('Error'), err)
        } else {
            console.log(chalk.green.bold('Done!'), `${newFile} has been generated`)
        }
    })
}

export const generateRoute = async (options) => {
    const nameInPascal = toPascalCase(options.name)
    const newFile = path.resolve(
        `${fullPathName}`,
        `../../../todoApp/src/routes`, 
        `${options.name}Routes.js`
      );
    const templateDir = path.resolve(
        fullPathName,
        `../../../templates/javascript/resource`, `route.ejs`
      );

    
    let file = await ejs.renderFile(templateDir, {_name: options.name, _nameInPascal: nameInPascal, _addAuthMiddleware: options.addAuthMiddleware})
    if(fs.existsSync(newFile) && !options.forceCreate) {
        console.log(chalk.red.bold('Error'), `${options.name}Routes already exists`)
        return
    }
    fs.writeFile(newFile, file, (err) => {
        if(err) {
            console.log(chalk.red.bold('Error'), err)
        } else {
            console.log(chalk.green.bold('Done!'), `${newFile} has been generated`)
        }
    })
}