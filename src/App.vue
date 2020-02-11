<template>
  <v-app id="keep">
    <AppNav></AppNav>
    <AppSidebar></AppSidebar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.siteTitle,
      // all titles will be injected into this template
      titleTemplate: "%s",
      htmlAttrs: {
        lang: "en"
      },
      link: [{ rel: "canonical", href: this.canonical }],
      meta: [
        { charset: "utf-8" },
        {
          vmid: "robots",
          name: "robots",
          content: "index, follow"
        },
        {
          vmid: "description",
          name: "description",
          content: this.siteDescription
        }
      ]
    };
  },
  components: {},
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.canonical = `${this.$store.getters.config.clientURL}${this.$store.getters.config.publicPath}${this.$route.path}`;
      console.log(this.canonical);
    }
  },
  data: () => ({
    loading: true,
    pages: [],
    canonical: "",
    siteDescription: "",
    title: ""
  }),
  mounted() {},
  async created() {
    this.loading = true;
    //console.log(this.canonical);
    if (!this.$store.state.isAppReady) {
      const configPromise = process.BROWSER_BUILD
        ? import("@/config.json")
        : Promise.resolve(require("@/config.json"));
      let config = await configPromise;
      this.$store.dispatch("setConfig", config);

      this.$store.dispatch("setSiteMeta");
      this.$store.dispatch("setMeetings");
      this.$store.dispatch("initApp");
    }
    this.siteTitle = `${this.$store.getters.config.siteTitle}`;
    this.siteDescription = `${this.$store.getters.config.siteDescription}`;
    this.canonical = `${this.$store.getters.config.clientURL}${this.$store.getters.config.publicPath}${this.$route.path}`;
    this.loading = false;
  }
};
</script>

<style>
.hover {
  cursor: pointer;
}
</style>
