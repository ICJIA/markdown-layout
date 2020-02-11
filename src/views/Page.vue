<template>
  <div>
    <base-content id="baseContentTop" class="mb-12" :loading="false">
      <template v-slot:title>
        <v-container>
          <v-row class="text-left">
            <v-col cols="12">
              <h1 class="page-title" :id="slugify(title)">
                {{ title }}
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:content>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              :md="dynamicFlex()"
              order-md="1"
              order="2"
              order-sm="2"
              class="markdown-body js-toc-content"
            >
              <component
                :is="markdownContent"
                @click.native="handleClicks"
                class="dynamic-content "
              />
            </v-col>
            <v-col
              v-if="showToc"
              cols="12"
              sm="12"
              md="3"
              order-md="2"
              order="1"
              order-sm="1"
            >
              <Toc :toc="$route.meta.toc"></Toc>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </base-content>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";

const slugs = require("slugs");
export default {
  mixins: [handleClicks],
  watch: {
    $route: "fetchContent"
  },
  data() {
    return {
      attributes: {},
      selectedArticle: null,
      title: "",
      markdownContent: null,

      showToc: false
    };
  },
  created() {
    this.loading = true;
    // eslint-disable-next-line no-undef
    NProgress.start();
    this.fetchContent();
    // eslint-disable-next-line no-undef
    NProgress.done();
    this.loading = false;
  },
  methods: {
    fetchContent() {
      this.markdownContent = async () =>
        await import(`../../public/markdown${this.$route.path}.md`)
          .then(fmd => {
            this.title = fmd.attributes.title;
            this.showToc = fmd.attributes.showToc;
            this.tocSelectors = fmd.attributes.tocSelectors;
            this.tocHeaders = fmd.attributes.tocHeaders;
            this.markdown = fmd.body;

            // this.$ga.page({
            //   page: this.$route.path,
            //   title: this.title,
            //   location: window.location.href
            // });

            return {
              extends: fmd.vue.component
            };
          })
          .catch(() => {});
    },
    slugify(str) {
      return slugs(str);
    },

    dynamicFlex() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return this.showToc ? "9" : "12";
      }
    }
  },
  mounted() {}
};
</script>

<style>
ol li {
  list-style-type: none;
}
</style>
