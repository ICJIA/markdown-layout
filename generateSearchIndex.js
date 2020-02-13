// eslint-disable-next-line no-unused-vars
const config = require("./src/config.json");
const fs = require("fs");
const routes = require("./src/router/markdownRoutes.json");

const saveJsonFile = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

let searchIndex = routes.map(route => {
  let obj = {};
  obj.path = route.path;
  obj.name = route.name;
  obj.title = route.meta.title;
  obj.searchMeta = route.meta.searchMeta;
  obj.summary = route.meta.summary;
  //   obj.createdAt = route.meta.createdAt;
  //   obj.updatedAt = route.meta.updatedAt;
  obj.headings = route.meta.toc.map(heading => {
    return heading.content;
  });
  return obj;
});

saveJsonFile(searchIndex, "./public/searchIndex.json");
console.log(`Created: ./public/searchIndex.json`);
