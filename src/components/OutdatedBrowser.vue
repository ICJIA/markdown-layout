<template>
  <div class="mt-5">
    <div
      style="background: #bf2b2b; border: 1px solid #aaa; color: #fff"
      class="text-center py-10"
    >
      You're using
      <span style="font-weight: 900; ">Internet Explorer</span>.<br />
      Internet Explorer will not display the R3 website correctly. ICJIA
      recommends updating to a secure, modern browser.<br />Please download the
      latest version of
      <a
        class="warning-link"
        href="https://www.google.com/chrome"
        target="_blank"
        rel="noreferrer"
        >Chrome</a
      >,
      <a
        href="https://www.mozilla.org/en-US/firefox/new/"
        target="_blank"
        rel="noreferrer"
        class="warning-link"
        >Firefox</a
      >, or
      <a
        href="https://www.microsoft.com/en-us/windows/microsoft-edge"
        rel="noreferrer"
        target="_blank"
        class="warning-link"
        >Microsoft Edge</a
      >.

      <!-- <template v-slot:actions>
        <v-btn text @click="dismiss">Dismiss</v-btn>
      </template> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
a.warning-link {
  color: #ddd;
  font-weight: 900;
  text-decoration: none;
}

a.warning-link:hover {
  text-decoration: underline;
}
</style>
