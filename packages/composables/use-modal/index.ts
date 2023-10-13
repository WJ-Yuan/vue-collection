// useVModel is better
import { computed } from 'vue';

const UPDATE_MODAL_SHOW = 'update:show';

interface ModalShowEmits {
  (e: typeof UPDATE_MODAL_SHOW, show: boolean): void;
  (...args: any[]): any;
}

export const useModalShow = <P extends { show: boolean }>(props: P, emits: ModalShowEmits) => {
  return computed<P['show']>({
    get() {
      return props.show;
    },
    set(show: boolean) {
      emits(UPDATE_MODAL_SHOW, show);
    }
  });
};
