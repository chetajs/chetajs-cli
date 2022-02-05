
# chetajs

![enter image description here](https://res.cloudinary.com/dpyywotyh/image/upload/v1644010567/chetajs/chetajs_banner_y11tt7.png)

  

NodeJS CLI generator tool for scaffolding ExpressJS applications.



*Pre-loaded authentication and authentication middleware for securing your application.*


## Install

Make sure you have [NodeJS](https://nodejs.org/en/) installed on your machine.

```
npm install chetajs -g
```

  

### Scalffold a new project

Navigate to the directory you wish to scalffold your new project then run the command below

```
$ chetajs new appname
$ cd appname
```

- Rename the env.txt to .env file in your base directory

  

### Usage

Navigate to your scaffolded project and run any command as desired

```
$ chetajs <command>:<arg> <name> [options]
```
  
### Commands

- make
- version
- help
  

### Args

|Arg|Alias|Description
|--|--|--|
| resource|res|generates a model, controller, service, route files |
| model|m|generates a model file |
| controller|c|generates a model, controller, service, route files |
| route|r|generates a route file |
| service|s|generates service files |

  

### Options
| Arg | Alias |Description
|--|--|--|
|- -force | -f |Create file even if it already exists
|- -empty |-e| Create controller without crud methods
| - -auth |-a|Add authenticate middleware to route |


### Run / Build
To run your application, use the command below
```
$ npm run dev
$ npm run build
```
***npm run build** generates a compiled version in the **dist** folder in the base directory of the project*
