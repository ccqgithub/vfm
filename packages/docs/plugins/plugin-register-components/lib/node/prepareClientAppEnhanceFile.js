'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.prepareClientAppEnhanceFile = void 0;
const getComponentsFromDir_1 = require('./getComponentsFromDir');
const prepareClientAppEnhanceFile = async (app, options, identifier) => {
  // get components from directory
  const componentsFromDir = await (0,
  getComponentsFromDir_1.getComponentsFromDir)(options);
  // components from options will override components from dir
  // if they have the same component name
  const componentsMap = {
    ...componentsFromDir,
    ...options.components
  };
  // client app enhance file content
  const content = `\
import { defineAsyncComponent } from 'vue';
${Object.entries(componentsMap).map(
  ([name, filepath]) => `
import ${name} from ${JSON.stringify(filepath)};
  `
).join('')}

export default ({ app }) => {\
${Object.entries(componentsMap).map(
  ([name]) => `
  app.component(${JSON.stringify(name)}, ${name});`
).join('')}
}
`;
  // write temp file and return the file path
  return app.writeTemp(
    `register-components/clientAppEnhance.${identifier}.js`,
    content
  );
};
exports.prepareClientAppEnhanceFile = prepareClientAppEnhanceFile;
