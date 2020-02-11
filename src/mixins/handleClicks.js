export const handleClicks = {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleClicks($event) {
      // intercepts <a></a> tag clicks and routes within app
      //$event.preventDefault();
      const { target } = $event;
      const href = $event.target.href;
      const mailto = /mailto/g;
      const isAFile = /^.*\.(pdf|doc|docx|xls|xlsx|zip|csv|json)$/i.test(href);

      if (isAFile) {
        $event.preventDefault();
        const filename = href.split("/").pop();
        console.log(
          "Download event: ",
          this.$route.meta.downloadPath + filename
        );
        let downloadPath = this.$route.meta.downloadPath + filename;
        // this.$ga.event({
        //   eventCategory: "File",
        //   eventAction: "Download",
        //   eventLabel: filename
        // });
        location.href = downloadPath;
      } else if (
        target &&
        target.matches(".dynamic-content a:not([href*='://'])") &&
        target.href &&
        !isAFile &&
        !href.match(mailto)
      ) {
        const {
          altKey,
          ctrlKey,
          metaKey,
          shiftKey,
          button,
          defaultPrevented
        } = $event;
        // don't handle with control keys
        if (metaKey || altKey || ctrlKey || shiftKey) return;
        // don't handle when preventDefault called
        if (defaultPrevented) return;
        // don't handle right clicks
        if (button !== undefined && button !== 0) return;
        // don't handle if `target="_blank"`
        if (target && target.getAttribute) {
          const linkTarget = target.getAttribute("target");
          if (/\b_blank\b/i.test(linkTarget)) return;
        }
        const url = new URL(target.href);
        const to = url.pathname;
        if (window.location.pathname !== to && $event.preventDefault) {
          $event.preventDefault();

          this.$router.push(to).catch(() => {
            this.$vuetify.goTo(0);
          });
        }
      } else {
        return null;
      }
    }
  }
};
