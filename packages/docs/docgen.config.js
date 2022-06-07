const path = require('path');

module.exports = {
  componentsRoot: path.resolve(__dirname, '../vfm/src/components'),
  components: '**/[A-Z]*.vue',
  outDir: 'src/components',
  apiOptions: {
    jsx: true // tell vue-docgen-api that your components are using JSX to avoid conflicts with TypeScript <type> syntax
  },
  getDocFileName: (componentPath) => componentPath.replace(/\.vue$/, '.md'), // specify the name of the input md file
  getDestFile: (file, config) =>
    path.join(config.outDir, file).replace(/\.vue$/, '.md'), // specify the name of the output md file
  docsRepo: 'profile/repo',
  docsBranch: 'master',
  docsFolder: '',
  editLinkLabel: 'Edit on github'
};
