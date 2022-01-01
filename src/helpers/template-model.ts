export class TemplateModel {
    
    private _fileName : string;
    public get fileName() : string {
        return this._fileName;
    }

    private _directory : string;
    public get directory() : string {
        return this._directory;
    }

    private _overideFile : string;
    public get overideFile() : string {
        return this._overideFile;
    }

    private _templateFile : string;
    public get templateFile() : string {
        return this._templateFile;
    }

    public model : any;

    constructor(fileName : string, directory : string, overideFile : string, templateFile : string, model : any) {
        this._fileName = fileName;
        this._directory = directory;
        this._overideFile = overideFile;
        this._templateFile = templateFile;
        this.model = model;
    }
    

}