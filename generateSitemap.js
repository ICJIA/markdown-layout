const config = require("./src/config.json");
const fs = require("fs");
const sm = require("sitemap");

const markdownRoutes = require("./src/router/markdownRoutes.json");
const manualRoutes = require("./src/router/manualRoutes.js");
const fallbackRoutes = require("./src/router/fallbackRoutes.js");
const routes = [...manualRoutes, ...markdownRoutes, ...fallbackRoutes];

let urls = routes.map(route => {
  if (route.meta.showInSitemap) {
    let obj = {};
    obj.url = `${config.clientURL}${config.publicPath}${route.path}`;
    obj.changefreq = "weekly";
    obj.priority = 0.5;
    obj.lastmod = route.meta.updatedAt || new Date().toJSON().substring(0, 10);
    return obj;
  }
});

let home = {};
home.url = `${config.clientURL}${config.publicPath}`;
home.changefreq = "weekly";
home.priority = 0.5;
home.lastmod = new Date().toJSON().substring(0, 10);
urls.push(home);

// filter undefined
let temp = [];
for (let i of urls) i && temp.push(i);
urls = temp;

let sitemap = sm.createSitemap({
  hostname: `${config.clientURL}${config.publicPath}`,
  cacheTime: 600000, //600 sec (10 min) cache purge period
  urls
});

fs.writeFileSync("./public/sitemap.xml", sitemap.toString());
console.log(`Created: ./public/sitemap.xml`);
