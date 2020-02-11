<template>
  <div>
    <v-card v-if="displaySimpleTable">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">State</th>
              <th class="text-left">County</th>
              <th class="text-left">Census Tract Name</th>
              <th class="text-left">GeoID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.state_name }}</td>
              <td>{{ item.county_name }}</td>
              <td>{{ item.census_tract_name }}</td>
              <td>{{ item.census_tract_geoid }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-card v-else>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          @keyup="watchQuery"
          v-model="search"
          id="my-input"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        v-if="!loading"
        id="test"
        style="width: 100%"
      ></v-data-table>
    </v-card>
    <div class="text-center mt-5" style="font-size: 12px;">
      Download:
      <a href="EligibleAreasCensusTracts.pdf" class="heavy">PDF</a
      >&nbsp;|&nbsp;<a
        class="heavy"
        href="api/data/EligibleAreasCensusTracts.json"
        >JSON</a
      >&nbsp;|&nbsp;<a
        class="heavy"
        href="api/data/EligibleAreasCensusTracts.csv"
        >CSV</a
      >
    </div>
  </div>
</template>

<script>
import { getCensusData } from "@/services/Content";

export default {
  async created() {
    this.fetchContent();
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    search(newValue, oldValue) {
      this.searchArr.push(newValue);
    }
  },

  mounted() {},
  computed: {
    displaySimpleTable() {
      return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.xs
        ? true
        : false;
    }
  },
  data() {
    return {
      showToc: true,
      loading: true,

      items: null,
      search: "",
      timeout: null,
      searchArr: [],
      headers: [
        {
          text: "State",
          align: "left",
          sortable: false,
          value: "state_name"
        },
        { text: "County", value: "county_name" },
        { text: "Census Tract Name", value: "census_tract_name" },
        { text: "Census Tract GeoID", value: "census_tract_geoid" }
      ]
    };
  },
  methods: {
    watchQuery() {
      clearTimeout(this.timeout);
      let input = document.getElementById("my-input");
      this.timeout = setTimeout(() => {
        console.log("Google event:", input.value);
        this.$ga.event({
          eventCategory: "Search Conversion",
          eventAction: "Input",
          eventLabel: `Query: '${input.value}'`
        });
      }, 1000);
    },
    async fetchContent() {
      // eslint-disable-next-line no-undef
      NProgress.start();
      this.loading = true;
      try {
        let items = await getCensusData();
        this.items = items;
        this.loading = false;
        // eslint-disable-next-line no-undef
        NProgress.done();
      } catch (e) {
        this.loading = false;
        // eslint-disable-next-line no-undef
        NProgress.done();
        console.log("Error: ", e);
      }
    }
  }
};
</script>
