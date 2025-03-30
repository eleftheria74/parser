const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const ALIASES = {
  cleaners: 'src/cleaners',
  utils: 'src/utils',
};

function walk(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, callback);
    else if (entry.isFile() && entry.name.endsWith('.js')) callback(fullPath);
  });
}

function toRelative(from, to) {
  let relative = path.relative(path.dirname(from), to);
  if (!relative.startsWith('.')) relative = './' + relative;
  return relative.replace(/\\/g, '/');
}

walk(SRC_DIR, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [alias, realPath] of Object.entries(ALIASES)) {
    const regex = new RegExp(`require\\(['"]${alias}\\/([^'"]+)['"]\\)`, 'g');
    content = content.replace(regex, (_, subPath) => {
      const absoluteTarget = path.resolve(__dirname, realPath, subPath);
      const relativePath = toRelative(filePath, absoluteTarget);
      changed = true;
      return `require('${relativePath}')`;
    });
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ updated', filePath);
  }
});
