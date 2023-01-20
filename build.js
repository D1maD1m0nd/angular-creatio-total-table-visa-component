const fs = require('fs-extra');
const concat = require('concat');
const componentPath = './dist/angular-creatio-total-table-visa-component/visa-cost-component.js';

(async function build() {
  const files = [
    './dist/angular-creatio-total-table-visa-component/runtime.js',
    './dist/angular-creatio-total-table-visa-component/polyfills.js',
    './dist/angular-creatio-total-table-visa-component/main.js',
    './tools/lodash-fix.js',
  ].filter((x) => fs.pathExistsSync(x));
  await fs.ensureFile(componentPath);
  await concat(files, componentPath);
})();
