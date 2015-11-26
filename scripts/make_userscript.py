import sys
import json

contents = open("manifest.json").read()
data = json.loads(contents)

packaged_data = []
packaged_css = []

skip_js = ["sites/chrome"]
# i dont care about leaking descriptors, do you?
for filename in data['content_scripts'][0]['js']:
    # skip the Chrome extension part
    skip = False
    for site in skip_js:
        if filename.find(site) != -1:
            skip = True

    if skip:
        continue

    packaged_data.append(open(filename).read())

for filename in data['content_scripts'][0]['css']:
    packaged_css.append(open(filename).read())

with open("dist/tobitabi.user.js", "w") as output_file:
    with open("sites/userscript_header.js") as userscript_file:
        header = userscript_file.read()
        for attr in [ "version", "description", "name", "short_name" ]:
            upattr = attr.upper()
            header = header.replace("##%s##" % upattr, data[attr])
        output_file.write(header)
        output_file.write("\n")

    output_file.write("(function() { \n")
    for js in packaged_data:
        output_file.write(js)
        output_file.write("\n");

    with open("sites/userscript.js") as userscript_file:
        output_file.write("\n")
        output_file.write(userscript_file.read())



    for css in packaged_css:
        output_file.write("addGlobalStyle(")
        output_file.write(json.dumps(css))
        output_file.write(")\n")
    output_file.write("\n})()");

