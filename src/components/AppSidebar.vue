<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    disable-resize-watcher
    clipped
    color="grey lighten-4"
  >
    <v-list dense class="grey lighten-4">
      links here
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  created() {
    EventBus.$on("toggleDrawer", () => {
      this.drawer = !this.drawer;
    });
  },
  data: () => ({
    drawer: false,
    nav: [],
    tableOfContents: []
  })
};
</script>
<style>
/* #keep .v-navigation-drawer__border {
  display: none;
} */
</style>
