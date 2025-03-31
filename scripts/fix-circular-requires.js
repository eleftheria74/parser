// scripts/fix-circular-requires.js

const madge = require('madge');
const fs = require('fs');
const path = require('path');

// Root source directory
const SRC_DIR = path.join(__dirname, '../src');

function getRequirePaths(content) {
  const requireRegex = /require\(['"](\.{1,2}\/[^'"]+)['"]\)/g;
  const paths = [];
  let match;
  while ((match = requireRegex.exec(content))) {
    paths.push(match[1]);
  }
  return paths;
}

function fixRequireInFile(filePath, fixMap) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const [from, to] of Object.entries(fixMap)) {
    const requirePattern = new RegExp(`require\(['"]${from}['"]\)`, 'g');
    if (requirePattern.test(content)) {
      const relativePath = path.relative(path.dirname(filePath), path.join(SRC_DIR, to));
      let fixedPath = relativePath.replace(/\\/g, '/');
      if (!fixedPath.startsWith('.')) fixedPath = './' + fixedPath;
      content = content.replace(requirePattern, `require('${fixedPath}')`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed circular require in: ${filePath}`);
  }
}

(async () => {
  const result = await madge(SRC_DIR, { baseDir: SRC_DIR });
  const circular = result.circular();

  if (circular.length === 0) {
    console.log('✅ No circular dependencies found.');
    return;
  }

  console.log(`❌ Found ${circular.length} circular dependencies!\n`);
  const fixMap = {};

  // Build a map from circular chains
  for (const cycle of circular) {
    for (let i = 0; i < cycle.length; i++) {
      const from = cycle[i];
      const to = cycle[(i + 1) % cycle.length];

      // Example: if from is "a/index.js" and to is "a/util.js" then we change require('./') to './util'
      if (path.basename(from) === 'index.js') {
        const fromDir = path.dirname(from);
        const toRel = path.relative(fromDir, to).replace(/\\/g, '/');
        fixMap[`./${fromDir === '.' ? '' : fromDir}`] = toRel;
      }
    }
  }

  // Walk all source files and apply fixes
  function walk(dir) {
    for (const file of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.js')) {
        fixRequireInFile(fullPath, fixMap);
      }
    }
  }

  walk(SRC_DIR);
})();
