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

function fixNamedExports(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  const exportConstRegex = /export\s+const\s+(\w+)\s*=\s*([^;]+);?/g;

  const matches = [...content.matchAll(exportConstRegex)];
  if (matches.length > 0) {
    matches.forEach((match) => {
      const [, name, value] = match;
      content = content.replace(match[0], `const ${name} = ${value};\nmodule.exports.${name} = ${name};`);
      modified = true;
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed named exports in ${filePath}`);
  }
}

walk('./src', fixNamedExports);
