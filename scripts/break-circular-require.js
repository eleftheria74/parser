// scripts/break-circular-require.js
const fs = require('fs');
const path = require('path');
const madge = require('madge');

const projectPath = path.resolve(__dirname, '../src');

function log(msg) {
  console.log(`[DEBUG] ${msg}`);
}

(async () => {
  const result = await madge(projectPath, {
    baseDir: projectPath,
    includeNpm: false,
    tsConfig: path.resolve(__dirname, '../tsconfig.json'),
  });

  const circularPaths = result.circular();

  if (circularPaths.length === 0) {
    log('✅ No circular dependencies found.');
    process.exit(0);
  }

  log(`❌ Found ${circularPaths.length} circular dependencies!`);

  const patchedFiles = new Set();

  circularPaths.forEach((cycle, i) => {
    log(`🔁 Cycle ${i + 1}: ${cycle.join(' -> ')}`);

    for (let j = 0; j < cycle.length - 1; j++) {
      const from = cycle[j];
      const to = cycle[j + 1];

      const fromPath = path.resolve(projectPath, from + '.js');
      const toPath = path.relative(path.dirname(fromPath), path.resolve(projectPath, to + '.js')).replace(/\\/g, '/');
      const requirePattern = new RegExp(`require\(['"](\.\.?\/)*${path.basename(to)}['"]\)`, 'g');

      if (fs.existsSync(fromPath)) {
        let content = fs.readFileSync(fromPath, 'utf-8');

        if (requirePattern.test(content)) {
          const modified = content.replace(requirePattern, `require('${toPath.startsWith('.') ? toPath : './' + toPath}')`);
          fs.writeFileSync(fromPath, modified);
          patchedFiles.add(from);
          log(`🛠️ Patched circular require in: ${from}`);
        } else {
          log(`⚠️ No matching require() in ${from} to ${to}`);
        }
      }
    }
  });

  if (patchedFiles.size === 0) {
    log('⚠️ Script ran, but no circular require statements were changed.');
  }
})();
