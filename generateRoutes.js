const fs = require("fs");
const path = require("path");
const base = "public/markdown";
const slugs = require("slugs");
const matter = require("gray-matter");
const toc = require("./lib/markdown-toc-fork");
//const moment = require("moment");
const moment = require("moment-timezone");

function findInDir(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      findInDir(filePath, filter, fileList);
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

let paths = findInDir(base, /\.md$/);
let generatedRoutes = [];

paths.forEach(path => {
  let fileObj = matter(fs.readFileSync(path, "utf8"));

  let routeObj = {};
  routeObj.path = path.replace(base, "").replace(".md", "");
  routeObj.name = slugs(routeObj.path);
  routeObj.meta = {};
  routeObj.meta.markdownPath = path;
  routeObj.meta.toc = toc(fileObj.content).json;
  routeObj.meta.title = fileObj.data.title || "Untitled";
  routeObj.meta.showToc = fileObj.data.showToc;
  routeObj.meta.tocHeading = fileObj.data.tocHeading || fileObj.data.title;
  routeObj.meta.downloadPath = `/downloads${routeObj.path}/`;
  routeObj.meta.showInSitemap = fileObj.data.showInSitemap;
  routeObj.meta.createdAt = moment.tz(
    fileObj.data.createdAt,
    "America/Chicago"
  );
  routeObj.meta.updatedAt = fileObj.data.updatedAt || routeObj.meta.createdAt;
  routeObj.meta.searchMeta = fileObj.data.searchMeta || "";
  routeObj.meta.summary = fileObj.data.summary || "";

  if (routeObj.path !== "/home") {
    generatedRoutes.push(routeObj);
  } else {
    routeObj.path = "/";
    routeObj.url = "/";
    generatedRoutes.push(routeObj);
  }
});

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

storeData(generatedRoutes, "./src/router/markdownRoutes.json");
console.log(`Created: ./src/router/markdownRoutes.json`);
