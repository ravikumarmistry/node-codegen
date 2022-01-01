
// templateModel = {
//     fileName: '', // default to template name
//     directory: '.', // default to current working directory
//     templateFile: '', // default to template.hbs
//     model: {
//         // add model properties here
//         msg: 'lets start generating your code',
//     }, // default to empty object
//     overideFile: false,
// };
module.exports = async function script () {
    let templateModels = [];

    // create template model
    const templateModel = {
        fileName: '', // default to template name
        directory: '.', // default to current working directory
        templateFile: '', // default to template.hbs
        model: {
            // add model properties here
            msg: 'lets start generating your code',
        }, // default to empty object
        overideFile: false,
    };
    templateModels.push(templateModel);
    return templateModels;
}
