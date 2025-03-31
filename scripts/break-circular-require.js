const fs = require('fs');
const path = require('path');
const madge = require('madge');

const projectRoot = path.resolve(__dirname, '../src');

function log(...args) {
  console.log('[DEBUG]', ...args);
}

function breakCircularRequire(filePath, dependencyPath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const importPath = path.relative(path.dirname(filePath), dependencyPath).replace(/\\/g, '/');
  const importRegex = new RegExp(
    `((const|let|var)\\s+\\w+\\s*=\\s*require\\(['"].*?)${importPath}(['"]\\))`,
    'g'
  );

  const newContent = content.replace(importRegex, (_match, p1, _p2, p3) => {
    log(`\u{1F6E0} Rewriting import in ${filePath}:`, p1 + './' + p3);
    return p1 + './' + p3;
  });

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    log(`\u{2705} Fixed circular require in:`, filePath);
    return true;
  }
  return false;
}

(async () => {
  const result = await madge(projectRoot, {
    baseDir: projectRoot,
    fileExtensions: ['js'],
  });

  const circularPaths = result.circular();

  if (circularPaths.length === 0) {
    log('✅ No circular dependencies found.');
    return;
  }

  log(`\u{274C} Found ${circularPaths.length} circular dependencies!`);
  let totalFixed = 0;

  for (const cycle of circularPaths) {
    for (let i = 0; i < cycle.length; i++) {
      const file = path.resolve(projectRoot, cycle[i]);
      const dep = path.resolve(projectRoot, cycle[(i + 1) % cycle.length]);

      log(`\u{1F50D} Checking ${file} -> ${dep}`);
      const fixed = breakCircularRequire(file, dep);
      if (fixed) totalFixed++;
    }
  }

  if (totalFixed === 0) {
    log('⚠️ Script ran, but no circular require statements were changed.');
  }
})();
