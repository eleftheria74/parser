// scripts/break-circular-require.js

const fs = require('fs');
const path = require('path');
const madge = require('madge');
const recast = require('recast');
const glob = require('glob');

console.log('[DEBUG] 🚀 Starting circular dependency check...');

const SRC_DIR = path.join(__dirname, '../src');

madge(SRC_DIR, { baseDir: SRC_DIR }).then((res) => {
  const circular = res.circular();
  if (circular.length === 0) {
    console.log('[DEBUG] ✅ No circular dependencies found.');
    process.exit(0);
  }

  console.log(`[DEBUG] ❌ Found ${circular.length} circular dependencies!`);

  const circularEdges = new Set();
  circular.forEach((cycle) => {
    for (let i = 0; i < cycle.length - 1; i++) {
      const from = cycle[i];
      const to = cycle[i + 1];
      circularEdges.add(`${from}=>${to}`);
    }
  });

  const jsFiles = glob.sync(`${SRC_DIR}/**/*.js`);
  let changedFiles = 0;

  jsFiles.forEach((filePath) => {
    let code = fs.readFileSync(filePath, 'utf8');
    let ast;

    try {
      ast = recast.parse(code);
    } catch (err) {
      console.warn(`[WARN] Skipping ${filePath}: ${err.message}`);
      return;
    }

    let modified = false;

    recast.types.visit(ast, {
      visitVariableDeclaration(pathVar) {
        const decls = pathVar.node.declarations;

        decls.forEach((decl) => {
          if (
            decl.init &&
            decl.init.type === 'CallExpression' &&
            decl.init.callee.name === 'require' &&
            decl.init.arguments.length === 1 &&
            decl.init.arguments[0].type === 'Literal'
          ) {
            const requiredPath = decl.init.arguments[0].value;
            const currentModule = filePath.replace(`${SRC_DIR}/`, '').replace(/\\/g, '/');
            const resolvedModule = path.join(path.dirname(currentModule), requiredPath).replace(/\\/g, '/');

            const fullEdge = `${currentModule}=>${resolvedModule}`;
            if (circularEdges.has(fullEdge)) {
              // Replace require(...) with () => require(...)
              decl.init = {
                type: 'ArrowFunctionExpression',
                params: [],
                body: decl.init,
                expression: true,
              };
              modified = true;
              console.log(`🔧 Patched circular require in: ${filePath}`);
            }
          }
        });

        this.traverse(pathVar);
      },
    });

    if (modified) {
      const newCode = recast.print(ast).code;
      fs.writeFileSync(filePath, newCode, 'utf8');
      changedFiles++;
    }
  });

  if (changedFiles === 0) {
    console.log('[DEBUG] ⚠️ Script ran, but no circular require statements were changed.');
  } else {
    console.log(`[DEBUG] ✅ Script patched ${changedFiles} files.`);
  }
}).catch((err) => {
  console.error('[ERROR]', err);
  process.exit(1);
});
