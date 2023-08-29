<template>
  <div style="height: 100%; width: 100%; overflow: auto">
    <div style="height: 100%; width: 100%; overflow: auto"></div>
    <!-- <h1 v-lazy-image="{ src: 'hh' }">测试</h1> -->
    <div>
      <img
        v-lazy-image="{
          src: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        }"
      />
    </div>

    <img
      v-lazy-image="{
        src: '',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { lazyImage as vLazyImage } from '@vue-collection/directives/index';
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}

body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
</style>
