const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, callback);
    } else if (f.endsWith('.js') && !f.endsWith('.test.js')) {
      callback(fullPath);
    }
  });
}

function convert(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  content = content.replace(/^import\s+(\w+)\s+from\s+['"](.*)['"];?/gm, (_, v, p) => {
    modified = true;
    return `const ${v} = require('${p}');`;
  });

  content = content.replace(/^import\s+\{\s*(.*?)\s*\}\s+from\s+['"](.*)['"];?/gm, (_, v, p) => {
    modified = true;
    return `const { ${v} } = require('${p}');`;
  });

  content = content.replace(/^export\s+default\s+/gm, () => {
    modified = true;
    return 'module.exports = ';
  });

  content = content.replace(/^export\s+\{\s*(.*?)\s*\};?/gm, (_, v) => {
    modified = true;
    return `module.exports = { ${v} };`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Converted: ${filePath}`);
  }
}

walk('./src', convert);
