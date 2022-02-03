import arg from "arg";
import inquirer from "inquirer";
import chalk from 'chalk';
import newProject from "./cmds/new";
import { generateController, generateModel, generateService, generateRoute } from "./cmds/generate";


function parseArguementsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install',
            '-n': '--name',
            '-c': '--controller',
            '-m': '--model',
            '-s': '--service'
        }, 
        {
            argv: rawArgs.slice(2)
        }
    );
    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        action: args._[0],
        runInstall: args['--install'] || false,
        projectName: args._[1],
        genModel: args._['--model'] || false,
        genService: args._['--service'] || false,
        genController: args._['--controller'] || false,
    }
}

async function promptForOptions(options) {
    const defaultTemplate = 'Javascript'
    if(options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate
        }
    }

    const questions = []
    if(!options.projectName) {
        questions.push(
            {
                type: 'input',
                name: 'projectName',
                message: 'Enter the name of the project:'
            }
        )
    } else {
        console.log(`${chalk.green('>')} ${chalk.bold('Project name:')} ${chalk.blue(options.projectName)}`)
    }

    if(!options.template) {
        questions.push(
            {
                type: 'list',
                name: 'template',
                message: 'Please chose which project template to use',
                choices: ['Javascript', 'Typescript'],
                default: defaultTemplate
            }
        )
    }

    if(!options.template) {
        questions.push(
            {
                type: 'list',
                name: 'database',
                message: 'Please chose which database type to use',
                choices: ['MongoDB', 'Sequelize'],
                default: 'MongoDB'
            }
        )
    }

    if(!options.git) {
        questions.push(
            {
                type: 'confirm',
                name: 'git',
                message: 'Do you want to initialize a git repository?',
                default: false
            }
        )
    }

    if(!options.runInstall) {
        questions.push(
            {
                type: 'confirm',
                name: 'install',
                message: 'Do you want to install dependencies?',
                default: false
            }
        )
    }

    const answers = await inquirer.prompt(questions)
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
        projectName: options.projectName || answers.projectName,
        runInstall: options.runInstall || answers.install
    }

}

export async function cli(args) {
    let argSlice = args.slice(2)
    let options = parseArguementsIntoOptions(args)
    if (options.action) {
        switch (options.action) {
            case 'new':
            case 'n':
                let opts = await promptForOptions(options)
                newProject(opts)
                break;
            case 'generate':
            case 'g':
                let action = argSlice[1]
                let name = argSlice[2]
                let forceCreate = false
                let addAuthMiddleware = true
                let optsGen = {
                    name,
                    forceCreate,
                    addAuthMiddleware
                }
                switch (action) {
                    case "resource":
                    case "res":
                        optsGen.action = "resource"
                        generateRoute(optsGen)
                        generateModel(optsGen)
                        generateController(optsGen)
                        generateService(optsGen)
                        break;
                    case "model":
                    case "m":
                        optsGen.action = "model"
                        generateModel(optsGen)
                        break;
                    case "controller":
                    case "c":
                        optsGen.action = "controller"
                        generateController(optsGen)
                        break;
                    case "service":
                        case "s":
                        optsGen.action = "service"
                        generateService(optsGen)
                        break;
                    case "route":
                        case "r":
                        optsGen.action = "route"
                        generateRoute(optsGen)
                        break;
                    default:
                        break;
                }
                break;
            default:
                console.log('Help doc')
                break;
        }
    } else {
        console.log('Help doc')
    }
}