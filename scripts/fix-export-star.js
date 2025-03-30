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

function fixExportStar(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const exportStarRegex = /^export\s+\*\s+from\s+['"](.+?)['"];?/gm;

  let modified = false;
  const matches = [...content.matchAll(exportStarRegex)];

  if (matches.length > 0) {
    const lines = [];

    matches.forEach((match) => {
      const requireVar = path.basename(match[1]).replace(/[^a-zA-Z0-9_$]/g, '_');
      lines.push(`const ${requireVar} = require('${match[1]}');`);
    });

    const exportLine = `module.exports = {\n${matches.map((m) => `  ...${path.basename(m[1]).replace(/[^a-zA-Z0-9_$]/g, '_')}`).join(',\n')}\n};`;

    content = content.replace(exportStarRegex, '');
    content = `${lines.join('\n')}\n\n${exportLine}\n`;

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed export * in ${filePath}`);
    modified = true;
  }

  return modified;
}

walk('./src', fixExportStar);
