import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

const markdownRoutes = require("./markdownRoutes.json");
const manualRoutes = require("./manualRoutes.js");
const fallbackRoutes = require("./fallbackRoutes.js");

//Add dynamic 'Page' component to generated routes
const generatedRoutes = markdownRoutes.map(route => {
  route.component = () =>
    import(/* webpackChunkName: "page" */ "../views/Page.vue");
  return route;
});

Vue.use(VueRouter);

const routes = [...manualRoutes, ...generatedRoutes, ...fallbackRoutes];
//console.dir(routes);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

// router.afterEach((to, from) => {
//   console.log("after route", to, from);
// });

export default router;
