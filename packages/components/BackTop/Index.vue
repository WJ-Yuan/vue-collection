<template>
  <div class="back-top" @click="onBack">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'BackTop',
});

const emits = defineEmits<{
  (e: 'back'): void;
}>();

const onBack = () => {
  window.scroll({ top: 0, behavior: 'smooth' });

  emits('back');
};
</script>

<style lang="scss" scoped>
.back-top {
  position: fixed;
  height: 50px;
  width: 50px;
  text-align: center;
  align-items: center;
  line-height: 50px;
  border-radius: 50%;
  background: blue;
  color: white;
  display: block;
  bottom: 100px;
  right: 100px;
  cursor: pointer;
}
</style>
