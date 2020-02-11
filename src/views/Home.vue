<template>
  <div>
    <base-content id="baseContentTop" class="mb-12" :loading="loading">
      <template v-slot:title>
        <v-container>
          <v-row class="text-left">
            <v-col cols="12">
              <h1 class="page-title" :id="slugify(title)">
                {{ $route.meta.title }}
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
              md="12"
              order-md="1"
              order="2"
              order-sm="2"
            >
              <HomePageContent
                @hook:mounted="initToc"
                @click.native="handleClicks"
                class="dynamic-content"
              ></HomePageContent>
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
import fm from "../../public/markdown/home.md";
import { EventBus } from "@/event-bus";
export default {
  mixins: [handleClicks],
  metaInfo() {
    return {
      title: this.title
    };
  },
  mounted() {
    this.loading = false;
  },
  components: {
    HomePageContent: {
      extends: fm.vue.component,
      components: {}
    }
  },

  data() {
    return {
      title: fm.attributes.title,
      showToc: fm.attributes.showToc,
      loading: true,
      toc: [],
      fm,
      tableOfContents: [],
      tocSelectors: "h2",
      tocHeaders: "h2"
    };
  },
  methods: {
    dynamicFlex() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return this.showToc ? "9" : "12";
      }
    },
    test() {
      console.log("click");
    },
    initToc() {
      if (!this.showToc) return;

      // eslint-disable-next-line no-undef
      NProgress.start();
      let doc = Array.from(document.querySelectorAll("h2,h3"));

      let parent;

      let tableOfContents = doc.map(d => {
        let obj = {};
        obj.heading = d.innerText;
        obj.id = `${d.id}`;
        obj.element = d.nodeName;
        obj.level = d.nodeName === "H2" ? 0 : 1;
        obj.hidden = false;
        if (d.nodeName === "H2") {
          parent = d.id;
          obj.parent = "";
          obj.hidden = false;
        } else {
          obj.parent = parent;
          obj.hidden = true;
        }
        return obj;
      });
      //console.table(tableOfContents);
      let tocObj = {};
      tocObj[this.$route.path] = tableOfContents;
      EventBus.$emit("tableOfContents", tocObj);
      // eslint-disable-next-line no-undef
      NProgress.done();
    },
    slugify(str) {
      return slugs(str);
    }
  }
};
</script>
