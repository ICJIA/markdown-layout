<template>
  <div class="my-10">
    <!-- <div class="iframe-container"> -->
    <iframe
      width="100%"
      height="740px"
      src="https://illinois.maps.arcgis.com/apps/View/index.html?appid=28ca57bc4b414faea9a74d0adb73d49d&extent=-95.0144,36.6611,-83.7204,42.7807"
      frameborder="0"
      scrolling="no"
    >
    </iframe>
    <!-- </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style>
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
  border: 1px solid #ccc;
}
.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
/* 4x3 Aspect Ratio */
.iframe-container-4x3 {
  padding-top: 75%;
}
</style>
