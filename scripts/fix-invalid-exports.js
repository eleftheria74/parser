const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, callback);
    } else if (file.endsWith('.js')) {
      callback(fullPath);
    }
  });
}

function fixExports(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Pattern 1: const something = require('./file').default;
module.exports = { something };
  const pattern1 = /module\.exports\s*=\s*{\s*default\s+as\s+(\w+)\s*}\s*from\s*['"](.*?)['"];?/g;
  content = content.replace(pattern1, (_, name, file) => {
    modified = true;
    return `const ${name} = require('${file}').default;\nmodule.exports = { ${name} };`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed export in ${filePath}`);
  }
}

walk('./src', fixExports);
walk('./scripts', fixExports);
