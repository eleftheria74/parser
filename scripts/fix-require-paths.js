const fs = require('fs');
const path = require('path');

const ALIASES = {
  'utils': 'src/resource/utils',
  'extractors': 'src/extractors',
  'cleaners': 'src/cleaners',
  'text': 'src/utils/text',
  'dom': 'src/utils/dom'
};

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

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  for (const [alias, realPath] of Object.entries(ALIASES)) {
   const aliasRegex = new RegExp(`require\\(['"]${alias}(\\/[^'"]*)?['"]\\)`, 'g');
    content = content.replace(aliasRegex, (_, subpath) => {
      const fromDir = path.dirname(filePath);
      const toPath = path.join(realPath, subpath);
      let relative = path.relative(fromDir, toPath);
      if (!relative.startsWith('.')) {
        relative = './' + relative;
      }
      modified = true;
      return `require('${relative.replace(/\\/g, '/')}')`;
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`🔧 Fixed: ${filePath}`);
  }
}

walk('./src', fixImports);
