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

function fixDefaultAsExports(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  const pattern = /module\.exports\s*=\s*{\s*default\s+as\s+(\w+)\s*};\s*from\s+['"](.*?)['"];/g;

  content = content.replace(pattern, (_, name, file) => {
    modified = true;
    return `const ${name} = require('${file}').default;\nmodule.exports = { ${name} };`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed 'default as' export in ${filePath}`);
  }
}

walk('./src', fixDefaultAsExports);
