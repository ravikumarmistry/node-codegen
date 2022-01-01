import * as path from 'path';
import * as fs from 'fs';
import { codegenDirectory } from '../helpers/constants';
import { checkIfCodeGenInitializedInCurrentDirectory, checkIfTemplateExistsAndReturnFlag, executeScript, executeTemplate } from '../helpers/utility';
import { HumanizedError } from '../helpers/HumanizedError';
import { TemplateModel } from '../helpers/template-model';
const runCommandHandler = async (templateName, args) => {

    checkIfCodeGenInitializedInCurrentDirectory();

    var isTemplateExists = checkIfTemplateExistsAndReturnFlag(templateName, codegenDirectory);
    if (!isTemplateExists) {
        throw new HumanizedError(`Template ${templateName} does not exists. Please run "codegen new ${templateName}" to create template.`);
    }

    // run template script file
    var model: TemplateModel[] | TemplateModel;
    try {
        model = await executeScript(codegenDirectory, templateName, args);
    } catch (error) {
        throw new HumanizedError(`Error while executing template script file.`, error, true);
    }

    const templateModels: TemplateModel[] = [];

    // check if model is an array
    if (!Array.isArray(model)) {
        // add model to template models
        templateModels.push(model);
    } else {
        // add models to template models
        model.forEach((model) => {
            templateModels.push(model);
        });
    }

    // run hbs template file for each template model
    templateModels.forEach((templateModel) => {

        let result: string = '';
        try {
            result = executeTemplate(codegenDirectory, templateName, templateModel);
        } catch (error) {
            throw new HumanizedError(`Error while executing template file.`, error, true);
        }

        // output file name
        const outputFileName = templateModel.fileName || templateName;

        // output directory
        const outputDirectory = path.resolve(templateModel.directory) || path.join(process.cwd(), templateName);

        // output file path
        const outputFilePath = path.join(outputDirectory, outputFileName);

        // override flag
        const overideFile = templateModel.overideFile || false;

        // check if output directory exists else create
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, { recursive: true });
        }

        // check if output file exists if exists and override flag is false throw error
        if (fs.existsSync(outputFilePath) && !overideFile) {
            throw new HumanizedError(`Output file ${outputFilePath} already exists.`);
        } else {
            // write output file
            fs.writeFileSync(outputFilePath, result);
        }
    });

    // log success message
    console.log(`Template ${templateName} generated successfully.`);
}

export default runCommandHandler;