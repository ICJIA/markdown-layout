/* eslint-disable no-unused-vars */

const config = require("./src/config.json");
const fs = require("fs");
const routes = require("./src/router/markdownRoutes.json");
var path = require("path");

const saveJsonFile = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

// get a list of site pages ...
let searchIndex = routes.map(route => {
  let obj = {};
  obj.type = "page";
  obj.path = route.path;
  obj.name = route.name;
  obj.title = route.meta.title;
  obj.searchMeta = route.meta.searchMeta;
  obj.summary = route.meta.summary;
  obj.headings = route.meta.toc.map(heading => {
    return heading.content;
  });
  return obj;
});

function walkSync(currentDirPath, callback) {
  var fs = require("fs"),
    path = require("path");
  fs.readdirSync(currentDirPath).forEach(function(name) {
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

// ... then get a list of site files ...
walkSync("./public/downloads", function(filePath, stat) {
  //console.log(filePath.replace("public", ""), path.basename(filePath));
  let obj = {};
  obj.type = "file";
  obj.path = filePath.replace("public", "");
  obj.name = path.basename(filePath);
  obj.title = obj.name;
  obj.searchMeta = "";
  obj.summary = "";
  obj.headers = [];
  searchIndex.push(obj);
});

// ... then save everything as json
saveJsonFile(searchIndex, "./public/searchIndex.json");
console.log(`Created: ./public/searchIndex.json`);
