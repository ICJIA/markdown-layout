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
              :md="dynamicFlex()"
              order-md="1"
              order="2"
              order-sm="2"
            >
              <HomePageContent
                @hook:mounted="generateToc"
                @click.native="handleClicks"
                class="dynamic-content"
              ></HomePageContent>
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
              <Toc :toc="toc"></Toc>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </base-content>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { handleClicks } from "@/mixins/handleClicks";
import { generateToc } from "@/mixins/generateToc";
const slugs = require("slugs");
import fm from "../../public/markdown/home.md";
// import { EventBus } from "@/event-bus";
export default {
  mixins: [handleClicks, generateToc],
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
      fm
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

    slugify(str) {
      return slugs(str);
    }
  }
};
</script>
