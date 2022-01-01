import { codegenDirectory, defaultTemplateContent, scriptDefaultTemplate } from '../helpers/constants';
import { checkIfCodeGenInitializedInCurrentDirectory, createCodegenFolderIfNotExists, createTemplateFiles } from '../helpers/utility';
const newCommandHandler = async (templateName, args) => {
    checkIfCodeGenInitializedInCurrentDirectory();
    createCodegenFolderIfNotExists(codegenDirectory);
    createTemplateFiles(templateName, codegenDirectory, defaultTemplateContent, scriptDefaultTemplate);

    // log success message
    console.log(`Template ${templateName} created.`);
};

export default newCommandHandler;