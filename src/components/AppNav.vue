<template>
  <div>
    <v-app-bar
      :app="addAppAttr"
      clipped-left
      :flat="flat"
      color="white"
      height="90"
      style="z-index: 5001 !important"
    >
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
      <v-col class="hidden-sm-and-down">
        <div style="width: 550px" class="">
          <SearchNav></SearchNav>
        </div>
      </v-col>

      <v-btn text class="hidden-md-and-up">
        <v-icon @click="showCard()">search</v-icon>
      </v-btn>
    </v-app-bar>
    <transition name="fade">
      <v-app-bar
        fixed
        dense
        v-if="extended"
        style="margin: 0; margin-top: 90px; padding: 0;"
      >
        <SearchNav
          style="margin-left: -15px; width: 110%; margin-right: -15px;"
        ></SearchNav>
      </v-app-bar>
    </transition>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  data() {
    return {
      extended: false,
      flat: false
    };
  },
  computed: {
    addAppAttr() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.xs) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    EventBus.$on("closeSearch", () => {
      this.extended = false;
    });
    EventBus.$on("unflattenNav", () => {
      this.flat = false;
    });
  },
  methods: {
    showCard() {
      // this.$vuetify.goTo(0);
      this.flat = !this.flat;
      this.extended = !this.extended;
    },
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.v-card.searchCard {
  background: #ccc !important;
}
</style>
