const path = require('path');
const fs = require('fs');

const copy = async () => {
  const apiPath = path.resolve(__dirname, './src/apis');
  const distApiPath = path.resolve(__dirname, './src/zh/apis');
  const compPath = path.resolve(__dirname, './src/components');
  const distCompPath = path.resolve(__dirname, './src/zh/components');
  const compfilterPath = path.resolve(__dirname, './src/components/index.md');

  await fs.promises.cp(apiPath, distApiPath, { recursive: true });
  await fs.promises.cp(compPath, distCompPath, {
    recursive: true,
    filter: (v) => {
      return v !== compfilterPath;
    }
  });
};

copy();
