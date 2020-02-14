import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import { EventBus } from "@/event-bus";

const markdownRoutes = require("./markdownRoutes.json");
const manualRoutes = require("./manualRoutes.js");
const fallbackRoutes = require("./fallbackRoutes.js");

//Add dynamic 'Page' component to generated routes
const generatedRoutes = markdownRoutes.map(route => {
  if (route.path != "/") {
    route.component = () =>
      import(/* webpackChunkName: "page" */ "../views/Page.vue");
  } else {
    route.component = () =>
      import(/* webpackChunkName: "static" */ "../views/Home.vue");
  }

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

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  EventBus.$emit("closeSearch");
  EventBus.$emit("unflattenNav");
});

export default router;
