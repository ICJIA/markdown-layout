const manualRoutes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "static" */ "../views/Home.vue"),
    meta: {
      markdownPath: "public/markdown/home.md",
      title: "AREAS ELIGIBLE FOR R3 PROGRAM GRANTS",
      tocHeading: "Eligible Areas",
      tocComponent: "Toc",
      url: "/",
      createdAt: "2020-01-23",
      updatedAt: "2020-01-23",
      showInSitemap: false
    }
  },

  {
    path: "/404",
    name: "404",
    meta: {
      title: "404",
      showInSitemap: false
    },

    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue")
  },

  {
    path: "/home",
    redirect: "/",
    meta: {
      showInSitemap: false
    }
  }
];

module.exports = manualRoutes;
