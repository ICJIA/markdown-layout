const fs = require("fs");
const path = require("path");
const base = "public/markdown";
const slugs = require("slugs");
const matter = require("gray-matter");
const toc = require("./lib/markdown-toc-fork");
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
  routeObj.meta.url = routeObj.path;
  routeObj.meta.title = fileObj.data.title || "Untitled";
  routeObj.meta.showInSitemap = fileObj.data.showInSitemap;
  routeObj.meta.showInNav = fileObj.data.showInNav;
  routeObj.meta.showInFooter = fileObj.data.showInFooter;
  routeObj.meta.showInSidebar = fileObj.data.showInSidebar;
  routeObj.meta.showToc = fileObj.data.showToc;
  routeObj.meta.tocHeading = fileObj.data.tocHeading || fileObj.data.title;
  routeObj.meta.createdAt =
    fileObj.data.createdAt || new Date().toJSON().substring(0, 10);
  routeObj.meta.updatedAt = fileObj.data.updatedAt || routeObj.meta.createdAt;

  if (routeObj.path !== "/home") generatedRoutes.push(routeObj);
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
