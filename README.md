# node-codegen
A template based, language agnostic, node scriptable code generator for developers .

## Installation

To install the the ravi-codegen run the following cmd from terminal

```dotnetcli
npm i -g ravi-codegen
```

## Initialize code generator

Run cmd from terminal
```dotnetcli
codegen init
```
It will create a folder `.codegen` where all your templates reside

## Templates
Every folder in `.codegen` directory considered as a template. 
Every template consist of at least two files
1. Template script (template.js) 
2. Template (template.ejs)

### Template script
Template script file is the entry point of your template script. Every template script must expose a default function that returns one or more Template models.

Every template model can have following fields.

1. fileName - `Template output file name, default: <template-name>`
2. directory - `Output directory relative path from current directory, default: ., eg. ../entities`
3. overideFile - `Should override existing file if true, default: false`
4. model - `any data which is required by the template, default: null`
5. templateFile - `template to be used for this template model, default: template.ejs`

So, a very simple script will look like as following 

```nodejs
module.exports = async function script (args) { // args, provided while running the script
    let templateModels = []; // for every model in templateModels codegen execute and generate some file defined by the model rules.

    // create template model
    const templateModel = {
        fileName: '', // Template output file name, default: <template-name>
        directory: '.', // Output directory relative path from current directory, default: ., eg. ../entities
        templateFile: '', // Template name to use, default: template.ejs
        model: {
            // add model properties here, any property added will be available in ejs template used.
            msg: 'lets start generating your code',
        }, 
        overideFile: false, // Should override if file exists, default false
    };
    templateModels.push(templateModel);
    return templateModels;
}
```
Script Examples

### Template file
`ravi-codegen` uses the EJS template to generate the files. Take a look at [EJS](https://ejs.co/#docs) understand text templating language.

## Create new template via cli
Run cmd from terminal
```dotnetcli
codegen new <template-name>
```
The above command will create a folder in `.codegen` directory with two files, namely `template.js` and `template.ejs`

## Run the codegen template
Run cmd from terminal
```dotnetcli
codegen run <template-name> [args]
```

The above command will execute and create code files according to your templates.
