/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
// eslint-disable-next-line no-unused-vars
//const config = require("@/config.json");
// eslint-disable-next-line no-unused-vars
import _ from "lodash";

Vue.use(Vuex);

const markdownRoutes = require("../router/markdownRoutes.json");
const manualRoutes = require("../router/manualRoutes.js");
const fallbackRoutes = require("../router/fallbackRoutes.js");
const routes = [...manualRoutes, ...markdownRoutes, ...fallbackRoutes];

export default new Vuex.Store({
  state: {
    isAppReady: false,
    config: null,
    routes: null,
    meetings: null,
    sections: null,
    siteMeta: null,
    searchIndex: null,
    lastDeploy: null,
    downloads: null,
    lastBuild: null,
    apiStatus: null,
    cache: new Map(),
    // eslint-disable-next-line no-dupe-keys
    routes: routes,
    jwt: localStorage.getItem("jwt") || "",
    userMeta: JSON.parse(localStorage.getItem("userMeta")) || ""
  },
  mutations: {
    CLEAR_CACHE(state) {
      state.cache.clear();
      console.log("Cache cleared");
    },
    CLEAR_LOCAL_STORAGE(state) {
      // localStorage.removeItem(LS_ROUTE_KEY);
      if (state.config.debug) {
        console.log("Local storage cleared");
      }
    },
    SET_APP_READY(state, bool) {
      state.isAppReady = bool;
      console.log("isAppReady", bool);
    },
    SET_CONFIG(state, config) {
      state.config = config;
      console.log("Config loaded");
    },

    SET_SEARCH_INDEX(state, searchIndex) {
      state.searchIndex = searchIndex;
      console.log("Search index loaded");
    },
    SET_CACHE(state, { hash, query }) {
      state.cache.set(hash, query);
      //console.log(hash, ": cached");
    },
    SET_SECTIONS(state, sections) {
      state.sections = sections;
      console.log("Sections loaded");
    },
    SET_API_STATUS(state, apiStatus) {
      state.apiStatus = apiStatus;
      console.log("API status code: ", apiStatus);
    },
    SET_SITEMETA(state, siteMeta) {
      state.siteMeta = siteMeta;
      console.log("siteMeta loaded.");
    },
    SET_MEETINGS(state, meetings) {
      state.meetings = meetings;
      console.log("Meetings loaded.");
    }
  },
  actions: {
    async initApp({ commit }) {
      commit("CLEAR_CACHE");
      commit("CLEAR_LOCAL_STORAGE");
      commit("SET_APP_READY", true);
    },
    async setApiStatus({ commit }) {
      commit("SET_API_STATUS", 200);
      console.log("status server bypassed");
    },
    setConfig({ commit }, config) {
      commit("SET_CONFIG", config);
    },

    setSearchIndex({ commit }, searchIndex) {
      commit("SET_SEARCH_INDEX", searchIndex);
    },

    setSections({ commit }, sections) {
      commit("SET_SECTIONS", sections);
    },
    async setSiteMeta({ commit }) {
      function getSection(key) {
        let root = key.split("/");
        const isRoot = /^.*\.(md)$/i.test(root[1]);
        if (isRoot) {
          return "/";
        } else {
          return `/${root[1]}`;
        }
      }
      const context = await require.context(
        "../../public/markdown",
        true,
        /\.md$/
      );

      const siteMeta = await context.keys().map(key => ({
        ...context(key),
        path: `/${key.replace(".md", "").replace("./", "")}`,
        root: `${getSection(key)}`
      }));
      commit("SET_SITEMETA", siteMeta);
    },
    async setMeetings({ commit }) {
      const meetingContext = await require.context(
        "../../public/markdown/meetings",
        true,
        /\.md$/
      );

      const meetings = await meetingContext.keys().map(key => ({
        ...meetingContext(key),
        path: `/meetings/${key.replace(".md", "").replace("./", "")}`
      }));
      console.log(meetings);
      commit("SET_MEETINGS", meetings);
    }
  },
  getters: {
    isApiReady: state => {
      if (state.apiStatus === 200 || state.apiStatus === 204) {
        return true;
      } else {
        return false;
      }
    },
    config: state => {
      return state.config;
    },

    debug: state => {
      return state.config.debug;
    },
    routes: state => {
      return state.routes;
    },
    searchIndex: state => {
      return state.searchIndex;
    },
    siteMeta: state => {
      return state.siteMeta;
    },
    meetings: state => {
      return state.meetings;
    }
  }
});
