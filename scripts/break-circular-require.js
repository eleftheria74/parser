const fs = require('fs');
const path = require('path');
const madge = require('madge');

const projectRoot = path.resolve(__dirname, '../src');

function findCircularDependencies() {
  return madge(projectRoot).then((res) => res.circular());
}

function patchRequire(filePath, targetModule) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const requireRegex = new RegExp(
    `(?:const|let|var)\s+([^=]+)\s*=\s*require\(['"](.*${targetModule})['"]\)`,
    'g'
  );

  let changed = false;
  content = content.replace(requireRegex, (match, vars, modPath) => {
    if (!modPath.endsWith('.cjs')) {
      changed = true;
      return match.replace(modPath, modPath + '.cjs');
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`🛠️ Patched circular require in: ${path.relative(projectRoot, filePath)}`);
  }
}

function breakCircularRequires() {
  findCircularDependencies().then((cycles) => {
    if (cycles.length === 0) {
      console.log('✅ No circular dependencies found.');
      return;
    }

    console.log(`\n❌ Found ${cycles.length} circular dependencies!`);
    const visited = new Set();

    for (const cycle of cycles) {
      for (let i = 0; i < cycle.length; i++) {
        const current = path.resolve(projectRoot, cycle[i] + '.js');
        const next = path.basename(cycle[(i + 1) % cycle.length]);

        const key = `${current} -> ${next}`;
        if (!visited.has(key) && fs.existsSync(current)) {
          patchRequire(current, next);
          visited.add(key);
        }
      }
    }
  });
}

breakCircularRequires();
