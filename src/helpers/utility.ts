import * as path from 'path';
import * as fs from 'fs';
import { HumanizedError } from './HumanizedError';
import { TemplateModel } from './template-model';
import * as ejs from 'ejs';

export function checkIfCodeGenInitializedInCurrentDirectory() {
    const codegenConfigFile = path.join(process.cwd(), 'codegen.config.json');
    if (!fs.existsSync(codegenConfigFile)) {
        throw new HumanizedError('Codegen config file does not exists. Please run "codegen init" to initialize codegen.');
    }
}

export function createCodegenFolderIfNotExists(codegenDirectory) {
    if (!fs.existsSync(codegenDirectory)) {
        fs.mkdirSync(codegenDirectory);
    }
}

export function createCodegenConfigInCurrentDirectoryIfnotExists(codegenConfig) {
    const codegenConfigFile = path.join(process.cwd(), 'codegen.config.json');
    if (!fs.existsSync(codegenConfigFile)) {
        fs.writeFileSync(codegenConfigFile, JSON.stringify(codegenConfig, null, 2));
    }
}

export function createTemplateFiles(templateName, codegenDirectory, templateFileContent, scriptFileContent) {
    const root = path.join(process.cwd(), codegenDirectory);
    const templateDir = path.join(root, templateName);
    const templateFile = path.join(templateDir, 'template.ejs');
    const templateScriptFile = path.join(templateDir, 'template.js');
    if (!fs.existsSync(root)) {
        fs.mkdirSync(root);
    }
    if (!fs.existsSync(templateDir)) {
        fs.mkdirSync(templateDir);
    }
    if (!fs.existsSync(templateFile)) {
        fs.writeFileSync(templateFile, templateFileContent);
    }
    if (!fs.existsSync(templateScriptFile)) {
        fs.writeFileSync(templateScriptFile, scriptFileContent);
    }
}

export function checkIfTemplateExistsAndReturnFlag(templateName, codegenDirectory): boolean {
    var isExists = true;
    const root = path.join(process.cwd(), codegenDirectory);
    const templateDir = path.join(root, templateName);
    if (!fs.existsSync(templateDir)) {
        isExists = false;
    }
    // check template js exists
    const templateScriptFile = path.join(templateDir, 'template.js');
    if (!fs.existsSync(templateScriptFile)) {
        isExists = false;
    }
    return isExists;
}

export async function executeScript(codegenDirectory, templateName, args: any): Promise<TemplateModel[] | TemplateModel> {
    const scriptImportPath = `${codegenDirectory}/${templateName}/template.js`;
    const scriptAbsolutePath = path.join(process.cwd(), scriptImportPath);
    const scripModule = await import(scriptAbsolutePath);
    const runScript = scripModule;
    const model = await runScript(args);
    return model;
}

export function executeTemplate(codegenDirectory, templateName, model: TemplateModel): string {
    const templateDirectoryPath = `${codegenDirectory}/${templateName}`;

    const tempAbsolutePath = path.join(process.cwd(), templateDirectoryPath, 'template.ejs');
    // ejs template file
    const templateFilePath = model.templateFile ? path.resolve(model.templateFile) : tempAbsolutePath;

    // check if template file exists if not exists throw error
    if (!fs.existsSync(templateFilePath)) {
        throw new HumanizedError(`Template ${templateName} file not found at location ${templateFilePath}.`);
    }

    // run ejs template file
    const template = fs.readFileSync(templateFilePath, 'utf8');
    const compiledTemplate = ejs.compile(template, {
        root: [path.join(process.cwd(), templateDirectoryPath)]
    });
    const result = compiledTemplate(model.model);

    return result;
}

export function actionRunner(fn: (...args) => Promise<any>, errorHandler: (error: Error) => void) {
    return (...args) => fn(...args).catch(errorHandler);
}
