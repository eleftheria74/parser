const fs = require('fs');
const path = require('path');

// Define aliases and their actual paths
const ALIASES = {
  'utils': 'src/resource/utils',
  'extractors': 'src/extractors',
  'cleaners': 'src/cleaners',
  'text': 'src/utils/text',
  'dom': 'src/utils/dom'
};

// Recursively walk through the directory
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

// Replace alias imports with relative paths
function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  for (const [alias, realPath] of Object.entries(ALIASES)) {
    const aliasRegex = new RegExp(`require\\(['"]${alias}(\\/[^'"]*)?['"]\\)`, 'g');
    content = content.replace(aliasRegex, (_, subpath) => {
      const fromDir = path.dirname(filePath);
      const toPath = subpath ? path.join(realPath, subpath) : realPath;
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

// Start processing
walk('./src', fixImports);
