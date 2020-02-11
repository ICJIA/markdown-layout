const fallbackRoutes = [
  {
    path: "*",
    redirect: "/404",
    meta: {
      title: "404",
      showInSitemap: false
    }
  }
];

module.exports = fallbackRoutes;
