const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (file.endsWith('.js')) {
      callback(fullPath);
    }
  });
}

function fixCleanersRequire(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  const patterns = [
    { regex: /require\(['"]cleaners['"]\)/g, replacement: "require('../../cleaners')" },
    { regex: /from ['"]cleaners['"]/g, replacement: "from '../../cleaners'" },
  ];

  for (const { regex, replacement } of patterns) {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed 'cleaners' import in ${filePath}`);
  }
}

walk('./src', fixCleanersRequire);
