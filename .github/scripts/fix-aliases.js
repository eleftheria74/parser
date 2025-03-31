name: Fix Aliases to Relative Paths

on:
  workflow_dispatch:

jobs:
  fix-aliases:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Run alias fixer script
        run: node .github/scripts/fix-aliases.js

      - name: Commit changes
        run: |
          git config --global user.name "github-actions"
          git config --global user.email "actions@github.com"
          git add .
          git commit -m "fix: replace module aliases with relative paths" || echo "No changes to commit"
          git push
