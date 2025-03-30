const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (file.endsWith('.js')) {
      callback(fullPath);
    }
  });
}

function fixInvalidRequireNames(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  const invalidRequireRegex = /const\s+(\d[\w\d_]*)\s*=\s*require\(['"](.+?)['"]\);/g;

  content = content.replace(invalidRequireRegex, (_, variableName, modulePath) => {
    modified = true;
    return `module.exports['${variableName}'] = require('${modulePath}');`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed invalid require name in ${filePath}`);
  }
}

walk('./src', fixInvalidRequireNames);
