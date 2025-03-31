// scripts/break-circular-require.js

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns που προκαλούν πρόβλημα σε circular require
const CIRCULAR_EXPORTS = [
  'getAttrs',
  'setAttr',
  'linkDensity',
  'paragraphize',
  'getOrInitScore',
  'getScore',
  'setScore',
  'addScore',
  'scoreNode',
  'scoreCommas',
  'scoreParagraph',
  'getWeight',
  'resolveSplitTitle',
];

// Ψάχνει αρχεία μέσα στη src
const files = glob.sync(path.join(__dirname, '../src/**/*.js'));

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf-8');
  let modified = false;

  CIRCULAR_EXPORTS.forEach((prop) => {
    const regex = new RegExp(
      `const\s*\{([^}]*?)\}\s*=\s*require\(['\"](\.{1,2}\/.*?|.*index)['\"]\)`,
      'g'
    );

    content = content.replace(regex, (match, props, modPath) => {
      const propsArr = props.split(',').map((p) => p.trim());
      if (propsArr.includes(prop)) {
        const filtered = propsArr.filter((p) => p !== prop);
        const newLine = filtered.length
          ? `const { ${filtered.join(', ')} } = require('${modPath}')`
          : '';
        const lazyLine = `const ${prop} = () => require('${modPath}').${prop};`;
        modified = true;
        return [newLine, lazyLine].filter(Boolean).join('\n');
      }
      return match;
    });
  });

  if (modified) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`🧹 Rewrote circular require in: ${file}`);
  }
});
