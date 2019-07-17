set -e

yarn build

cd dist

git init
git add -A
git commit -m 'deploy'

git push https://github.com/michaloslav/MichaelFarnik.git master:gh-pages -f

cd ..