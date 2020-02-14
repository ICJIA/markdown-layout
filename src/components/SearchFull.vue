<template>
  <div class="">
    <v-container fluid
      ><v-col cols="12">
        <v-form class="">
          <v-text-field
            ref="textfield"
            v-model="query"
            label="Search"
            placeholder="Search"
            @keyup="instantSearch"
          />
        </v-form>
      </v-col>
    </v-container>

    <div v-if="query.length">
      <div v-for="(result, index) in queryResults" :key="index">
        <v-card
          class="mb-8 px-5 py-5 grey lighten-4 elevation-0"
          @click="followPath(result)"
        >
          <div class="text-right">{{ result.type }}</div>
          <h2>{{ result.title }}</h2>
          <p>{{ result.summary }}</p>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Fuse from "fuse.js";

export default {
  components: {},

  data() {
    return {
      query: "",
      queryResults: [],
      content: ""
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    query(newValue, oldValue) {}
  },
  async created() {
    this.fuse = new Fuse(this.$store.getters.searchIndex, {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: ["searchMeta", "title", "headings", "summary", "type"]
    });
  },
  methods: {
    instantSearch() {
      this.queryResults = this.fuse.search(this.query);
      //console.log(this.fuse.search(this.query));
    },
    followPath(result) {
      if (result.type === "page") {
        this.$router.push(result.path);
      } else if (result.type === "file") {
        location.href = result.path;
      } else {
        return;
      }
    }
  }
};
</script>
