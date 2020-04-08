npm run build
git add dist/ && git commit -m "deploy changes to GitHub Pages"
git subtree push --prefix dist origin gh-pages

