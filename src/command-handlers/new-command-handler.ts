import { codegenDirectory, defaultTemplateContent, scriptDefaultTemplate } from '../helpers/constants';
import { HumanizedError } from '../helpers/HumanizedError';
import { checkIfCodeGenInitializedInCurrentDirectory, checkIfTemplateExistsAndReturnFlag, createCodegenFolderIfNotExists, createTemplateFiles } from '../helpers/utility';
const newCommandHandler = async (templateName, args) => {
    checkIfCodeGenInitializedInCurrentDirectory();
    createCodegenFolderIfNotExists(codegenDirectory);

    var isTemplateExists = checkIfTemplateExistsAndReturnFlag(templateName, codegenDirectory);
    if (isTemplateExists) {
        throw new HumanizedError(`Template ${templateName} already exists.`);
    }

    createTemplateFiles(templateName, codegenDirectory, defaultTemplateContent, scriptDefaultTemplate);

    // log success message
    console.log(`Template ${templateName} created.`);
};

export default newCommandHandler;