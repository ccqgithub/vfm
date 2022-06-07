const { createTypeDocApp } = require('./typedoc-markdown');
const path = require('path');

createTypeDocApp({
  name: 'API Documentation',
  tsconfig: path.resolve(__dirname, '../vfm/tsconfig.json'),
  entryPointStrategy: 'resolve',
  githubPages: false,
  entryPoints: [path.resolve(__dirname, '../vfm/src/index.ts')],
  excludePrivate: true,
  excludeInternal: true
}).build();
