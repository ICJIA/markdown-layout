<template>
  <v-col class="hidden-sm-and-down">
    <div style="width: 550px">
      <v-text-field label="hidden" style="display:none"></v-text-field>
      <v-text-field
        ref="textfield"
        v-model="query"
        placeholder="Search"
        @keyup="instantSearch"
        solo-inverted
        flat
        clear-icon
        clearable
        hide-details
        label="Search"
        prepend-inner-icon="search"
      />
      <v-card
        v-if="query && query.length"
        style="position: absolute; margin-top: 2px; margin-left: 2px; width: 550px"
      >
        <!-- <div v-for="(result, index) in queryResults" :key="index">
          <v-card class="white elevation-0" @click="followPath(result)">
            {{ result[0]["type"] }}
          </v-card>
        </div> -->
        <div v-if="queryResults['file'] && queryResults['file'].length">
          <div
            style="background: #0D4474; font-size: 18px; font-weight: bold; color: #fff"
            class="px-2 py-1"
          >
            Files
          </div>
          <div
            v-for="(item, index) in queryResults['file']"
            :key="index"
            class="px-3"
            @click="followPath(item)"
          >
            <div class="my-2 hover">
              <div class="resultTitle">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div v-if="queryResults['page'] && queryResults['page'].length">
          <div
            style="background: #0D4474; font-size: 18px; font-weight: bold;  color: #fff"
            class="px-2 py-1"
          >
            Pages
          </div>
          <div
            v-for="(item, index) in queryResults['page']"
            :key="index"
            class="px-3"
            @click="followPath(item)"
          >
            <div class="my-2 hover result">
              <div class="resultTitle">{{ item.title }}</div>
              <div style="font-size: 12px; color: #555" class="pl-2">
                {{ item.summary }}
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </v-col>
</template>

<script>
import Fuse from "fuse.js";
import _ from "lodash";
export default {
  async created() {
    const searchIndexPromise = process.BROWSER_BUILD
      ? import("../../public/searchIndex.json")
      : Promise.resolve(require("../../public/searchIndex.json"));
    let searchIndex = await searchIndexPromise;
    //console.log(searchIndex);
    this.searchIndex = searchIndex;
    this.fuse = new Fuse(this.searchIndex, {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: ["searchMeta", "title", "headings", "summary", "type"]
    });
  },
  mounted() {
    console.log(this.$refs["textfield"]);
  },
  data() {
    return {
      query: "",
      queryResults: [],
      content: "",
      searchIndex: []
    };
  },
  methods: {
    instantSearch() {
      let queryResults = this.fuse.search(this.query).slice(0, 8);
      let groupedResults = _.groupBy(queryResults, function(q) {
        return q.type;
      });
      //console.log(groupedResults);
      this.queryResults = groupedResults;
    },
    followPath(result) {
      if (result.type === "page") {
        this.queryResults = "";
        this.query = "";
        this.$router.push(result.path).catch(() => {
          this.$vuetify.goTo(0);
        });
      } else if (result.type === "file") {
        this.queryResults = "";
        this.query = "";
        location.href = result.path;
      } else {
        return;
      }
    }
  }
};
</script>

<style>
.resultTitle {
  font-weight: bold;
}
.resultTitle:hover {
  color: #999;
}
</style>
