<template>
  <v-footer dark padless class="noprint">
    <v-card
      flat
      tile
      class="white--text text-center"
      style="width: 100%; background: #235e8e"
    >
      <v-card-text>
        <span v-for="link in nav" :key="link.attributes.title" class="flexitem">
          <span>
            <v-btn
              :to="link.path === '/home' ? '/' : `${link.path}`"
              depressed
              class=" mr-1"
              style="background: #235e8e; font-weight: 900 !important"
              :aria-label="link.attributes.title"
            >
              <span v-if="link.attributes.menuTitle" style="font-size: 12px">{{
                link.attributes.menuTitle
              }}</span>
              <span v-else style="font-size: 12px">{{
                link.attributes.title
              }}</span>
            </v-btn>
          </span>
        </span>
      </v-card-text>
    </v-card>
    <v-card
      flat
      tile
      class="white--text text-center"
      style="width: 100%; background: #0D4474"
    >
      <v-divider />

      <v-card-text class="white--text">
        <div style="font-size: 12px">
          &copy;&nbsp;{{ new Date().getFullYear() }}
          <strong>
            <a href="http://www.icjia.state.il.us" class="footer-link"
              >Illinois Criminal Justice Information Authority</a
            > </strong
          >&nbsp;|&nbsp;
          <strong>
            <a
              href="https://archive.icjia.cloud"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >ICJIA Document Archive</a
            > </strong
          >&nbsp;|&nbsp;
          <strong>
            <a
              href="https://github.com/ICJIA/icjia-r3"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Github</a
            >
          </strong>
        </div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import _ from "lodash";
export default {
  data: () => ({
    icons: ["fab fa-facebook", "fab fa-twitter"],
    loading: true,
    nav: []
  }),

  created() {
    let nav = [];
    this.siteMeta.forEach(item => {
      if (item.attributes.showInFooter) nav.push(item);
    });
    let sortedNav = _.orderBy(nav, ["attributes.menuRank"], ["asc"]);
    //console.log(nav);

    this.nav = sortedNav;
  },
  methods: {
    getPath(link) {
      console.log(link.path);
      return "/";
    }
  },
  props: {
    siteMeta: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style>
.footer-link {
  color: #fff !important;
  text-decoration: none;
}

.footer-link:hover {
  color: #aaa !important;
}
</style>
