import { computed } from 'vue';

const UPDATE_MODAL_SHOW = 'update:show';

interface ModalShowEmits {
  (e: typeof UPDATE_MODAL_SHOW, show: boolean): void;
  (...args: any[]): any;
}

export const useModalShow = (props: any, emits: ModalShowEmits) => {
  const modalShow = computed<boolean>({
    get() {
      return props.show;
    },
    set(show: boolean) {
      emits(UPDATE_MODAL_SHOW, show);
    },
  });

  return {
    modalShow,
  };
};
