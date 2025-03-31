const madge = require('madge');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('\n[DEBUG] 🚀 Starting circular dependency check...\n');

  const res = await madge('src', {
    fileExtensions: ['js'],
    tsConfig: false // ✅ Απενεργοποιούμε TypeScript parsing
  });

  const circular = res.circular();
  if (!circular.length) {
    console.log('[DEBUG] ✅ No circular dependencies found!');
    return;
  }

  console.log(`[DEBUG] ❌ Found ${circular.length} circular dependencies!`);

  const patched = new Set();

  circular.forEach((cycle) => {
    for (let i = 0; i < cycle.length; i++) {
      const from = path.resolve('src', cycle[i]);
      const to = path.resolve('src', cycle[(i + 1) % cycle.length]);

      console.log(`[DEBUG] 🔍 Checking ${from} -> ${to}`);

      if (!fs.existsSync(from) || !fs.existsSync(to)) continue;

      const content = fs.readFileSync(from, 'utf8');
      const relativeTo = './' + path.relative(path.dirname(from), to).replace(/\\/g, '/');
      const basenameTo = path.basename(to).replace(/\.js$/, '');
      const requireRegex = new RegExp(`require\\(['"]${relativeTo}['"]\\)`, 'g');

      const updatedContent = content.replace(requireRegex, `() => require('${relativeTo}')`);

      if (updatedContent !== content) {
        fs.writeFileSync(from, updatedContent);
        patched.add(from);
      }
    }
  });

  if (patched.size > 0) {
    for (const file of patched) {
      console.log(`🛠️ Patched circular require in: ${path.relative(process.cwd(), file)}`);
    }
  } else {
    console.log('[DEBUG] ⚠️ Script ran, but no circular require statements were changed.');
  }
}

run();
