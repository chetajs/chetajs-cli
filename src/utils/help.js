import chalk from 'chalk';
import boxen from 'boxen';
import {version} from '../../package.json';

export const helpDoc = () => {
    return `${boxen(`
    ${chalk.yellow('ChetaJS')} - Cli generator for scaffolding ExpressJS applications     
    Version ${version}
    `, 
    { borderColor: 'green', borderStyle: 'round'})}

    Usage:

        $ chetajs <command>:<arg> <name> [options]
        ${chalk.yellow(':<arg> is only supported for the make command')}

    Commands:
        new
        make
        version
        help

    Args:
        resource    Generates a model, controller, service, route files
        model       Generates a model file
        controller  Generates a controller file
        route       Generates a route file
        service     Generates a service file

    Options:
        --force  Create file even if it already exists
        --empty  Create empty controller, service (without crud methods)
        --auth   Add authenticate middleware to route
    
    Examples:
        $ chetajs new todoApp ${chalk.grey('Creates a new expressJS project with name todoApp')}
        $ chetajs make:controller bill --empty --force
        $ chetajs help
    `
}