// scripts/break-circular-require.js
const fs = require('fs');
const path = require('path');
const madge = require('madge');

const SRC_PATH = path.join(__dirname, '../src');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8');
}

function log(...args) {
  console.log('[DEBUG]', ...args);
}

(async () => {
  const result = await madge(SRC_PATH, { baseDir: SRC_PATH });
  const circularPaths = result.circular();

  if (!circularPaths.length) {
    console.log('✅ No circular dependencies found.');
    return;
  }

  console.log(`❌ Found ${circularPaths.length} circular dependencies!`);

  const changedFiles = new Set();

  for (const cycle of circularPaths) {
    for (let i = 0; i < cycle.length; i++) {
      const file = path.resolve(SRC_PATH, cycle[i] + '.js');
      if (!fs.existsSync(file)) continue;

      let code = read(file);
      let modified = false;

      // Find require('./index') style circular imports
      const pattern = /const (\w+) = require\(['"]\.\/index['"]\)/g;
      code = code.replace(pattern, (match, varName) => {
        log(`🔍 Found circular require in ${file}`);
        modified = true;
        return `let ${varName};
try { ${varName} = require('./index'); } catch (e) { ${varName} = {}; }`;
      });

      if (modified) {
        write(file, code);
        changedFiles.add(file);
        log(`🛠️ Patched ${file}`);
      }
    }
  }

  if (changedFiles.size === 0) {
    log('⚠️ Script ran, but no circular require statements were changed.');
  }
})();
