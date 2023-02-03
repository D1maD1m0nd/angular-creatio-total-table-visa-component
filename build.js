const fs = require('fs-extra');
const concat = require('concat');
const componentPath = './dist/angular-creatio-total-table-visa-component/vlt-summary-visa-cost-component.js';

(async function build() {
    const files = [
        './dist/angular-creatio-total-table-visa-component/runtime.js',
        './dist/angular-creatio-total-table-visa-component/polyfills.js',
        './dist/angular-creatio-total-table-visa-component/main.js',
    ].filter((x) => fs.pathExistsSync(x));
    await fs.ensureFile(componentPath);
    await concat(files, componentPath);
})();
