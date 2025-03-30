const esbuild = require('esbuild');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

// Πάρε όλα τα .js αρχεία μέσα από το src (recursive)
const files = glob.sync('src/**/*.js');

files.forEach((file) => {
  const outFile = path.join('dist-cjs', file.replace(/^src[\/\\]/, ''));

  esbuild.buildSync({
    entryPoints: [file],
    outfile: outFile,
    bundle: false,
    format: 'cjs',
    platform: 'node',
    target: ['node10'],
    logLevel: 'silent',
  });

  console.log(`✅ Converted: ${file}`);
});
