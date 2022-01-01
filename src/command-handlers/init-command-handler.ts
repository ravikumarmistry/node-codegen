import { codegenDirectory } from '../helpers/constants';
import { createCodegenConfigInCurrentDirectoryIfnotExists, createCodegenFolderIfNotExists } from '../helpers/utility';
const initCommandHandler = async (args) => {
    createCodegenConfigInCurrentDirectoryIfnotExists({
        version: '1.0.0',
        installedTemplates: [],
    });

    createCodegenFolderIfNotExists(codegenDirectory);
}

export default initCommandHandler;