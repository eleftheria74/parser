// scripts/break-circular-require.js

const madge = require('madge');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../src');

function getCircularModules(tree) {
  return tree.circular();
}

function commentRequire(filePath, targetModule) {
  let content = fs.readFileSync(filePath, 'utf-8');

  const regex = new RegExp(
    `(^|\n)(\s*)const (\w+) = require\(['"](.*${targetModule})['"]\];`,
    'g'
  );

  let modified = false;
  content = content.replace(regex, (match, newline, spaces, varName, importPath) => {
    modified = true;
    return `${newline}${spaces}// 🚨 Removed to break circular require: const ${varName} = require('${importPath}');`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`💥 Commented circular require to '${targetModule}' in ${filePath}`);
  }
}

(async () => {
  const res = await madge(ROOT_DIR, { baseDir: ROOT_DIR });
  const circular = getCircularModules(res);

  if (circular.length === 0) {
    console.log('✅ No circular dependencies found.');
    return;
  }

  console.log(`❌ Found ${circular.length} circular dependencies!`);

  for (const cycle of circular) {
    // For each circular group, comment out require in last file of the cycle
    for (let i = 0; i < cycle.length; i++) {
      const current = cycle[i];
      const next = cycle[(i + 1) % cycle.length];

      const currentPath = path.join(ROOT_DIR, `${current}.js`);
      const targetModule = next.split('/').pop();

      if (fs.existsSync(currentPath)) {
        commentRequire(currentPath, targetModule);
      }
    }
  }
})();
