const fs = require('fs');
const path = require('path');
const glob = require('glob');

function walkAndFix() {
  const files = glob.sync('src/**/*.js');

  files.forEach(filePath => {
    let code = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    code = code.replace(/require\(['"](.+?)\/index['"]\)/g, (match, basePath) => {
      const fullPath = path.resolve(path.dirname(filePath), basePath);
      if (!fs.existsSync(fullPath)) return match;

      const filenames = fs.readdirSync(fullPath)
        .filter(f => f.endsWith('.js') && f !== 'index.js');

      if (filenames.length === 1) {
        modified = true;
        const newRequire = path.join(basePath, filenames[0])
          .replace(/\\/g, '/');
        return `require('${newRequire.replace(/\\.js$/, '')}')`;
      }

      return match;
    });

    if (modified) {
      fs.writeFileSync(filePath, code, 'utf-8');
      console.log(`🔁 Fixed circular require in: ${filePath}`);
    }
  });
}

walkAndFix();
