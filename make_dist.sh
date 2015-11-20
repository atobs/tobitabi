rm -fr build
rm tobitabi.build tobitabi.zip -fr
mkdir build
cp * build/ -R 2> /dev/null
mv build tobitabi.build
zip tobitabi.zip tobitabi.build/* tobitabi.build/src/* tobitabi.build/sites/all.js
