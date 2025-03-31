// scripts/fix-circular-requires.js

const madge = require('madge');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

(async () => {
  const result = await madge(path.join(__dirname, '../src'), {
    baseDir: path.join(__dirname, '../src'),
  });

  const circularPaths = result.circular();

  if (circularPaths.length === 0) {
    console.log('✅ No circular dependencies found.');
    return;
  }

  console.log(`\n❌ Found ${circularPaths.length} circular dependencies!`);

  const filesToFix = new Set();
  for (const cycle of circularPaths) {
    for (const file of cycle) {
      filesToFix.add(file);
    }
  }

  for (const file of filesToFix) {
    const fullPath = path.join(__dirname, '../src', file);
    let content = fs.readFileSync(fullPath, 'utf-8');

    // Εντοπίζει exports που έχουν αναφορές στον εαυτό τους ή σε imports που δημιουργούν κύκλο
    const exportPattern = /module\.exports\s*=\s*\{([\s\S]*?)\};/gm;
    let match;
    while ((match = exportPattern.exec(content)) !== null) {
      const body = match[1];
      const lines = body.split(/[,\n]/).map(l => l.trim()).filter(Boolean);

      const cleaned = lines.filter(line => {
        // κρατάμε μόνο ό,τι είναι ήδη ορισμένο
        const definedRegex = new RegExp(`(const|let|var|function)\\s+${line.split(':')[0].trim()}`);
        return definedRegex.test(content);
      });

      const newExport = `module.exports = {\n  ${cleaned.join(',\n  ')}\n};`;
      content = content.replace(match[0], newExport);
    }

    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`🛠️ Fixed circular exports in: ${file}`);
  }
})();
