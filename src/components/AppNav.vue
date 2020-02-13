<template>
  <v-app-bar app clipped-left color="white" height="90">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink ml-2 mr-2 hover"
        contain
        :src="require('@/assets/img/icjia-logo-blue.png')"
        transition="scale-transition"
        :width="logoWidth()"
        @click="
          $router.push('/').catch(err => {
            $vuetify.goTo(0);
          })
        "
      />
      <div class="ml-4" style="font-size: 24px; font-weight: 900">
        TITLE HERE
      </div>
    </div>
    <v-spacer></v-spacer>

    <v-text-field
      solo-inverted
      flat
      hide-details
      label="Search"
      prepend-inner-icon="search"
    />
  </v-app-bar>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  methods: {
    toggleDrawer() {
      EventBus.$emit("toggleDrawer");
    },
    logoWidth() {
      //console.log(this.$vuetify.breakpoint);
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return 70;
      } else {
        return 90;
      }
    }
  }
};
</script>

<style>
.nav-title {
  font-weight: 900;
  font-size: 24px;
}
.nav-title.small {
  font-size: 15px;
}
</style>
