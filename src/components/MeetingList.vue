<template>
  <div>
    <div v-for="(meeting, index) in meetings" :key="index">
      <v-card class="hover px-5 py-5 mb-5" @click="$router.push(meeting.path)">
        <small>{{ meeting.attributes.scheduledDate | format }}</small>
        <h3>{{ meeting.attributes.title }}</h3>
        <p>{{ meeting.attributes.summary }}</p>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      meetings: this.$store.getters.meetings
    };
  }
};
</script>

<style lang="scss" scoped></style>
