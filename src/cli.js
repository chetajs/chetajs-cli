import arg from "arg";
import inquirer from "inquirer";
import chalk from 'chalk';
import newProject from "./cmds/new";
import { makeController, makeModel, makeService, makeRoute } from "./cmds/make";
import { helpDoc } from "./utils/help";
import {version} from '../package.json';


function parseArguementsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '--force': Boolean,
            '--auth': Boolean,
            '--empty': Boolean,
            '-a': '--auth',
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install',
            '-n': '--name',
            '-f': '--force',
            '-e': '--empty'
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
        genModel: args['--model'] || false,
        genService: args['--service'] || false,
        genController: args['--controller'] || false,
        forceAction: args['--force'] || false,
        authRoute: args['--auth'] || false,
        empty: args['--empty'] || false,
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

    if(!options.projectDescription) {
        questions.push(
            {
                type: 'input',
                name: 'projectDescription',
                message: 'Enter the project description:'
            }
        )
    }

    if(!options.template) {
        questions.push(
            {
                type: 'list',
                name: 'template',
                message: 'Please chose which project template to use',
                choices: ['Javascript'],
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
                choices: ['MongoDB'],
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
        projectDescription: options.projectDescription || answers.projectDescription,
        runInstall: options.runInstall || answers.install
    }

}

export async function cli(args) {
    let argSlice = args.slice(2)
    let options = parseArguementsIntoOptions(args)
    if(options.action == "new") {
        let opts = await promptForOptions(options)
        newProject(opts)
        return
    }

    if(options.action == "version" || options.action == "v") {
        console.log(`Version ${version}`)
        return
    }

    if(options.action == "help" || options.action == "h") {
        console.log(helpDoc())
        return
    }

    const [action, type] = options.action.split(":")
    if (action == "make") {
        let name = argSlice[1]
        const {forceAction, authRoute, empty} = options
        let optsGen = {
            name,
            forceAction,
            authRoute,
            empty
        }
        switch (type) {
            case "resource":
            case "res":
                optsGen.action = "resource"
                makeModel(optsGen)
                makeController(optsGen)
                makeService(optsGen)
                makeRoute(optsGen)
                break;
            case "model":
            case "m":
                optsGen.action = "model"
                makeModel(optsGen)
                break;
            case "controller":
            case "c":
                optsGen.action = "controller"
                makeController(optsGen)
                break;
            case "service":
                case "s":
                optsGen.action = "service"
                makeService(optsGen)
                break;
            case "route":
                case "r":
                optsGen.action = "route"
                makeRoute(optsGen)
                break;
            default:
                console.log(helpDoc())
                break;
        }
    } else {
        console.log(helpDoc())
    }
}