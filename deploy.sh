#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs

# navigate into the build output directory
cd docs

git init
git add -A
git commit -m 'deploy'

# update without history
git push -f git@github.com:b4dnewz/node-emailhunter.git master:gh-pages

cd -