<template>
  <slot name="default"></slot>
</template>

<script lang="ts" setup>
import {
  onBeforeUnmount,
  useSlots,
  watch,
  ref,
  onMounted,
  onUpdated,
} from 'vue';
import type { VNode } from 'vue';

defineOptions({
  name: 'ResizeObserver',
});

const emits = defineEmits<{
  (e: 'resize', entry: ResizeObserverEntry): void;
}>();

let resizeObserver: ResizeObserver | null;

const children = ref<VNode>();
const slots = useSlots();

watch(children, (children) => {
  const target = ((children as any).ctx.vnode as VNode).el as HTMLElement;
  if (target) {
    createResizeObserver(target);
  }
});

onMounted(() => {
  children.value = slots.default!()[0];
});

onUpdated(() => {
  children.value = slots.default!()[0];
});

const createResizeObserver = (target: HTMLElement) => {
  if (!target) return;

  resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    emits('resize', entry);
  });

  resizeObserver.observe(target);
};

const destroyResizeObserver = () => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
};

onBeforeUnmount(() => {
  if (resizeObserver) destroyResizeObserver();
});
</script>
