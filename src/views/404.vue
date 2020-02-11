<template>
  <v-container class="text-center" fill-height style="height: 80vh;">
    <v-row align="center">
      <v-col>
        <h1 class="display-2 primary--text">404</h1>

        <p class="mt-3">The page you are looking for does not exist.</p>

        <v-btn :to="`/`" color="primary" outlined class="mt-4">
          <v-icon left>home</v-icon>Go Home
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FourOhFour",

  created() {}
};
</script>
