"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerComponentsPlugin = void 0;
const utils_1 = require("@vuepress/utils");
const chokidar = require("chokidar");
const prepareClientAppEnhanceFile_1 = require("./prepareClientAppEnhanceFile");
const registerComponentsPlugin = ({ components = {}, componentsDir = null, componentsPatterns = ['**/*.vue'], getComponentName = (filename) => utils_1.path.trimExt(filename.replace(/\/|\\/g, '-')), } = {}) => {
    const options = {
        components,
        componentsDir,
        componentsPatterns,
        getComponentName,
    };
    // use options hash as the identifier of client app enhance file
    // to avoid conflicts when using this plugin multiple times
    const optionsHash = (0, utils_1.hash)(options);
    return {
        name: '@vuepress/plugin-register-components',
        multiple: true,
        clientAppEnhanceFiles: (app) => (0, prepareClientAppEnhanceFile_1.prepareClientAppEnhanceFile)(app, options, optionsHash),
        onWatched: (app, watchers) => {
            if (componentsDir) {
                const componentsWatcher = chokidar.watch(componentsPatterns, {
                    cwd: componentsDir,
                    ignoreInitial: true,
                });
                componentsWatcher.on('add', () => {
                    (0, prepareClientAppEnhanceFile_1.prepareClientAppEnhanceFile)(app, options, optionsHash);
                });
                componentsWatcher.on('unlink', () => {
                    (0, prepareClientAppEnhanceFile_1.prepareClientAppEnhanceFile)(app, options, optionsHash);
                });
                watchers.push(componentsWatcher);
            }
        },
    };
};
exports.registerComponentsPlugin = registerComponentsPlugin;
