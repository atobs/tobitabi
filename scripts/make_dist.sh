rm -fr build
rm tobitabi.build tobitabi.zip -fr
mkdir build
echo "" > dist/build.log
cp * build/ -R 2>>dist/build.log
mv build tobitabi.build
mkdir dist 2>/dev/null
zip dist/tobitabi.zip tobitabi.build/* tobitabi.build/src/* tobitabi.build/sites/all.js 2>&1 > dist/build.log
python scripts/make_userscript.py
rm -fr tobitabi.build/
