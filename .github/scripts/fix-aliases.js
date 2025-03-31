const fs = require('fs');
const path = require('path');

const aliasMap = {
  'cleaners': 'src/cleaners',
  'utils/dom': 'src/resource/utils/dom',
  'utils/text': 'src/resource/utils/text',
};

const SRC_DIR = path.join(__dirname, '../../src');

function walk(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, callback);
    } else if (entry.name.endsWith('.js')) {
      callback(fullPath);
    }
  });
}

function replaceAliasInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const [alias, targetPath] of Object.entries(aliasMap)) {
    const regex = new RegExp(`require\\(['"]${alias}['"]\\)`, 'g');
    if (regex.test(content)) {
      const fromDir = path.dirname(filePath);
      const relPath = path.relative(fromDir, path.join(__dirname, '../../', targetPath)).replace(/\\/g, '/');
      const fixedPath = relPath.startsWith('.') ? relPath : './' + relPath;
      content = content.replace(regex, `require('${fixedPath}')`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✔ Fixed aliases in: ${filePath}`);
  }
}

walk(SRC_DIR, replaceAliasInFile);
