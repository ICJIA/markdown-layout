export const generateToc = {
  data() {
    return {
      toc: null
    };
  },
  mounted() {},
  methods: {
    generateToc() {
      if (!this.showToc) return;

      let doc = Array.from(document.querySelectorAll("h2,h3"));

      let parent;

      let tableOfContents = doc.map((d, index) => {
        let obj = {};
        obj.content = d.innerText;
        let id = d.id.replace("test-app-", "toc-");
        obj.id = id;

        obj.target = `${d.id}`;
        obj.seen = 0;
        obj.i = index;
        obj.lvl = d.nodeName === "H2" ? 2 : 3;
        if (d.nodeName === "H2") {
          parent = d.id;
          obj.parent = "";
        } else {
          obj.parent = parent;
        }

        return obj;
      });

      this.toc = tableOfContents;
      return this.toc;
    }
  }
};
