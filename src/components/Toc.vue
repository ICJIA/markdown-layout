<template>
  <div
    class="toc "
    :class="{
      'pl-2': $vuetify.breakpoint.xs || $vuetify.breakpoint.xs,
      'pl-10':
        $vuetify.breakpoint.md ||
        $vuetify.breakpoint.lg ||
        $vuetify.breakpoint.xl,
      shaded: $vuetify.breakpoint.xs || $vuetify.breakpoint.xs
    }"
    style="margin-top: -25px"
  >
    <div
      v-if="
        $vuetify.breakpoint.md ||
          $vuetify.breakpoint.lg ||
          $vuetify.breakpoint.xl
      "
    >
      <div
        v-if="tocHeading.length"
        ref="anchor"
        style="margin-left: -3px; font-weight: bold; font-size: 14px;"
        class="mb-4 hover anchor visible"
        @click="$vuetify.goTo(0)"
      >
        {{ `${tocHeading.toUpperCase()}` }}
      </div>
    </div>
    <div v-else>
      <div
        v-if="tocHeading.length"
        ref="anchor"
        style="margin-left: -3px; font-weight: bold; font-size: 14px;"
        class="mb-4 hover anchor visible"
        @click="$vuetify.goTo(0)"
      >
        NAVIGATION
      </div>
    </div>

    <div class="divider pl-5">
      <div v-for="(item, index) in tocMap" :key="index">
        <div
          v-if="item.level === 0"
          class="my-3 px-2 tocItem hover"
          :id="`scrollTo-${item.id}`"
          @click="scrollTo(item.id)"
          style="font-size: 14px; font-weight: 700; color: #555;"
        >
          {{ item.heading }}
        </div>

        <div
          v-if="
            item.level === 1 &&
              ($vuetify.breakpoint.lg ||
                $vuetify.breakpoint.md ||
                $vuetify.breakpoint.xl)
          "
          class="ml-3 my-2 tocItem hover animated fadeIn"
          :id="`scrollTo-${item.id}`"
          @click="scrollTo(item.id)"
          style="font-size: 13px;"
          :class="{
            hidden: item.parent != currentHeading
          }"
        >
          {{ item.heading }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    tocMap() {
      return this.tableOfContents;
    }
  },
  methods: {
    handleScroll() {
      let els = null;
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;

      els = document.querySelectorAll("h2, h3");

      const tocLinks = document.querySelectorAll(".tocItem");
      const tocHeadings = document.querySelectorAll("h2");
      //console.log(tocHeadings);

      if (scrollPosition < 100) {
        tocLinks.forEach(link => {
          link.classList.remove("visible");
        });
        this.$refs["anchor"].classList.add("visible");
        this.currentHeading = "";
      } else {
        this.$refs["anchor"].classList.remove("visible");
      }

      els.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        // eslint-disable-next-line no-unused-vars
        const elBottom = el.getBoundingClientRect().bottom;

        if (elTop < 120) {
          let tocEl = document.getElementById(`scrollTo-${el.id}`);

          tocLinks.forEach(link => {
            link.classList.remove("visible");
          });
          tocEl.classList.add("visible");
        }
      });

      tocHeadings.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        // eslint-disable-next-line no-unused-vars
        const elBottom = el.getBoundingClientRect().bottom;
        //console.log(el);
        if (elTop < 120) {
          this.currentHeading = el.id;
        }
      });
    },
    scrollTo(id) {
      this.$vuetify.goTo(`#${id}`, { offset: 15 });
    }
  },

  data() {
    return {
      tocList: [],
      currentHeading: ""
    };
  },
  props: {
    tableOfContents: {
      type: Array,
      default: () => {}
    },
    tocHeading: {
      type: String,
      default: "NAVIGATION"
    },
    tocSelectors: {
      type: String,
      default: "h2"
    },
    tocHeadings: {
      type: String,
      default: "h2"
    },
    top: {
      type: String,
      default: "#baseContentTop"
    },
    enableTracking: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
.divider {
  border-left: 1px solid #ccc;
}
.toc {
  position: -webkit-sticky !important; /* Safari */
  position: sticky !important;
  top: 125px !important;
  font-size: 13px;
}

.visible {
  color: #116bb9 !important;
  font-weight: bold;
}
.anchor {
  padding: 2px 5px 2px 5px;
}
.anchor:hover {
  color: #116bb9;
  background: #eee;
}

.hidden {
  display: none;
}

@media only screen and (max-width: 960px) {
  .divider {
    border-left: 0px solid #ccc !important;
    background: #eee;
    padding: 15px;
  }
  .tocItem:hover {
    background: #ccc !important;
  }
}
</style>
