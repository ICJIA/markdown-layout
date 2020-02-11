<template>
  <div>
    <h2 id="nav">nav</h2>
    {{ $store.state }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      siteMeta: null,
      nav: null
    };
  },
  async created() {
    let nav = [];
    let siteMeta = this.$store.getters.siteMeta;
    siteMeta.forEach(item => {
      if (item.attributes.showInNav) nav.push(item);
    });
    this.nav = nav;
  }
};
</script>

<style lang="scss" scoped></style>
