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
          v-if="item.lvl === 2"
          class="my-3 px-2 tocItem hover"
          :id="`${item.id}`"
          @click="scrollTo(`${item.target}`)"
          style="font-size: 14px; font-weight: 700; color: #555;"
        >
          {{ `${item.content}` }}
        </div>
        <div
          v-if="
            item.lvl === 3 &&
              ($vuetify.breakpoint.lg ||
                $vuetify.breakpoint.md ||
                $vuetify.breakpoint.xl)
          "
          class="ml-3 my-2 tocItem hover animated fadeIn"
          style="font-size: 13px;"
          :id="`${item.id}`"
          @click="scrollTo(`${item.target}`)"
          :class="{
            hidden: item.parent != currentHeading
          }"
        >
          {{ item.content }}
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
      return this.toc;
    }
  },
  data() {
    return {
      currentHeading: ""
    };
  },
  props: {
    toc: {
      type: Array,
      default: () => []
    },
    tocHeading: {
      type: String,
      default: "NAVIGATION"
    }
  },
  methods: {
    handleScroll() {
      let els = null;
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (
        this.$vuetify.breakpoint.md ||
        this.$vuetify.breakpoint.lg ||
        this.$vuetify.breakpoint.xl
      ) {
        els = document.querySelectorAll("h2, h3");
      } else {
        els = document.querySelectorAll("h2");
      }

      const tocLinks = document.querySelectorAll(".tocItem");
      const tocHeadings = document.querySelectorAll("h2");
      // console.log(tocLinks);

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
        // console.log(el);

        if (elTop < 120) {
          let tocID = el.id.replace("test-app-", "toc-");
          //console.log(tocID);
          let tocEl = document.getElementById(`${tocID}`);
          //console.log(tocEl);
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
          let heading = el.id;
          this.currentHeading = heading;
        }
      });
    },
    scrollTo(id) {
      this.$vuetify.goTo(`#${id}`, { offset: 15 });
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
