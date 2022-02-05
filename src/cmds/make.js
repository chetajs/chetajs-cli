import path from 'path';
import fs from 'fs'
import ejs from 'ejs'
import chalk from 'chalk';
import { toPascalCase } from '../utils/strings'
import boxen from 'boxen';
import { cwd } from 'process';


let fullPathName = __dirname;
fullPathName = fullPathName.substring(1)

export const makeModel = async (options) => {
    const nameInPascal = toPascalCase(options.name)
    const newFile = path.resolve(
        `${cwd()}`,
        `./src/models`, 
        `${options.name}Model.js`
      );
    const templateDir = path.resolve(
        fullPathName,
        `../../../templates/javascript/resource`, `model.ejs`
      );

    
    let file = await ejs.renderFile(templateDir, {_name: options.name, _nameInPascal: nameInPascal})
    if(fs.existsSync(newFile) && !options.forceAction) {
        console.log(chalk.red.bold('Error'), `${options.name}Model already exists`)
        return
    }
    fs.writeFile(newFile, file, (err) => {
        if(err) {
            console.log(chalk.red.bold('Error'), err)
        } else {
            console.log(chalk.green.bold('DONE'), `${options.name}Model has been generated`)
        }
    })
}

export const makeController = async (options) => {
    const nameInPascal = toPascalCase(options.name)
    const newFile = path.resolve(
        `${cwd()}`,
        `./src/controllers`, 
        `${options.name}Controller.js`
      );
    const templateDir = path.resolve(
        fullPathName,
        `../../../templates/javascript/resource`, `controller.ejs`
      );

    
    let file = await ejs.renderFile(templateDir, {_name: options.name, _nameInPascal: nameInPascal, _empty: options.empty})
    if(fs.existsSync(newFile) && !options.forceAction) {
        console.log(chalk.red.bold('Error'), `${options.name}Controller already exists`)
        return
    }
    fs.writeFile(newFile, file, (err) => {
        if(err) {
            console.log(chalk.red.bold('Error'), err)
        } else {
            console.log(chalk.green.bold('DONE'), `${options.name}Controller has been generated`)
        }
    })
}

export const makeService = async (options) => {
    const nameInPascal = toPascalCase(options.name)
    const newFile = path.resolve(
        `${cwd()}`,
        `./src/services`, 
        `${options.name}Service.js`
      );
    const templateDir = path.resolve(
        fullPathName,
        `../../../templates/javascript/resource`, `service.ejs`
      );

    
    let file = await ejs.renderFile(templateDir, {_name: options.name, _nameInPascal: nameInPascal, _empty: options.empty})
    if(fs.existsSync(newFile) && !options.forceAction) {
        console.log(chalk.red.bold('Error'), `${options.name}Service already exists`)
        return
    }
    fs.writeFile(newFile, file, (err) => {
        if(err) {
            console.log(chalk.red.bold('Error'), err)
        } else {
            console.log(chalk.green.bold('DONE'), `${options.name}Service has been generated`)
        }
    })
}

export const makeRoute = async (options) => {
    const nameInPascal = toPascalCase(options.name)
    const indexRoute = path.resolve(
        `${cwd()}`,
        `./src/routes`,
        `index.js`
      );
    const newFile = path.resolve(
        `${cwd()}`,
        `./src/routes`, 
        `${options.name}Routes.js`
      );
    const templateDir = path.resolve(
        fullPathName,
        `../../../templates/javascript/resource`, `route.ejs`
      );

    
    let file = await ejs.renderFile(templateDir, {_name: options.name, _nameInPascal: nameInPascal, _addAuthMiddleware: options.authRoute})
    if(fs.existsSync(newFile) && !options.forceAction) {
        console.log(chalk.red.bold('Error'), `${options.name}Routes already exists`)
        return
    }
    fs.writeFile(newFile, file, (err) => {
        if(err) {
            console.log(chalk.red.bold('Error'), err)
        } else {
            console.log(chalk.green.bold('DONE'), `${options.name}Routes has been generated`)
            // add route to index.js
            const importStatement = `import ${options.name}Routes from "./${options.name}Routes"`
            const appRouter = `appRouter.use('/${options.name}', ${options.name}Routes)`
            // fs.appendFileSync(indexRoute, importStatement)
            // fs.appendFileSync(indexRoute, appRouter)
            console.log(boxen(`
   Add the below to ${chalk.blue(indexRoute)}   

   - ${chalk.yellow(importStatement)}
   - ${chalk.yellow(appRouter)}
`, {title: 'Action Required', borderColor: 'green', borderStyle: 'round'}))
        }
    })
}

export const makePackage = async (options) => {
    const newFile = path.resolve(
        `${cwd()}`,
        `${options.projectName}/package.json`
      );
    const templateDir = path.resolve(
        fullPathName,
        `../../../templates/javascript/resource`, `package.json.ejs`
      ); 

    
    let file = await ejs.renderFile(templateDir, {_name: options.projectName.toLowerCase(), _description: options.projectDescription})
    fs.writeFile(newFile, file, (err) => {
        if(err) {
            console.log(chalk.red.bold('Error'), err)
        } else {
            console.log(chalk.green.bold('DONE'), `package.json has been generated`)
        }
    })
}