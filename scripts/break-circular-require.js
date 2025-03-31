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

      const content = fs.readFileSync(from, 'utf8');
      const relPath = path.relative(path.dirname(from), to).replace(/\\/g, '/');
      const requireRegex = new RegExp(`require\\(['"](?:\\.{1,2}\\/)?${relPath}['"]\\)`, 'g');

      const updatedContent = content.replace(requireRegex, `() => require('./${path.basename(to)}')`);

      if (updatedContent !== content) {
        fs.writeFileSync(from, updatedContent);
        patched.add(from);
      }
    }
  });

  if (patched.size > 0) {
    for (const file of patched) {
