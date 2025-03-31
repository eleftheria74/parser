const fs = require('fs');
const path = require('path');
const madge = require('madge');

const SRC_DIR = path.join(__dirname, '../src');

(async () => {
  const result = await madge(SRC_DIR, { baseDir: SRC_DIR });
  const circularPaths = result.circular();

  if (circularPaths.length === 0) {
    console.log('✅ No circular dependencies found.');
    return;
  }

  console.log(`\n❌ Found ${circularPaths.length} circular dependencies!`);

  const filesToPatch = new Set();

  circularPaths.forEach((cycle) => {
    for (let i = 0; i < cycle.length; i++) {
      const from = path.resolve(SRC_DIR, cycle[i]);
      const to = path.resolve(SRC_DIR, cycle[(i + 1) % cycle.length]);

      filesToPatch.add(from);
    }
  });

  filesToPatch.forEach((filePath) => {
    let code = fs.readFileSync(filePath, 'utf-8');
    let original = code;

    const requireRegex = /const\s+(\w+)\s*=\s*require\(['"](\.\.\/.*?|.*)['"]\);?/g;

    code = code.replace(requireRegex, (match, varName, requirePath) => {
      if (requirePath.startsWith('.') || requirePath.startsWith('..')) {
        return `function ${varName}() { return require('${requirePath}'); }`;
      }
      return match;
    });

    if (code !== original) {
      fs.writeFileSync(filePath, code, 'utf-8');
      console.log(`🛠️ Patched circular require in: ${path.relative(SRC_DIR, filePath)}`);
    }
  });
})();
