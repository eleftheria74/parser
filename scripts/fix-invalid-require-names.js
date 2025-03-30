const fs = require('fs');
const path = require('path');

// Regex για να εντοπίζουμε require με invalid JS ονόματα
const invalidRequireRegex = /const\s+([0-9][\w$]*)\s*=\s*require\((['"`].+?['"`])\);?/g;

// Μετατροπή του ονόματος σε έγκυρο (π.χ. 247sports => _247sports_com)
function toValidName(str) {
  return '_' + str.replace(/[^a-zA-Z0-9_$]/g, '_');
}

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

function fixInvalidRequireNames(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  content = content.replace(invalidRequireRegex, (_, name, requirePath) => {
    const validName = toValidName(name);
    modified = true;
    return `const ${validName} = require(${requirePath});`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed invalid require name(s) in ${filePath}`);
  }
}

walk('./src', fixInvalidRequireNames);
