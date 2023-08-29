import { ref } from 'vue';

export const usePage = (sizeList: number[], size: number) => {
  const total = ref<number>(0);
  const currentPage = ref<number>(0);
  const pageSize = ref<number>(size);

  const onPageChange = (page: number, callback?: Function, ...args: any[]) => {
    currentPage.value = page;
    callback && callback.call(this, ...args);
  };

  const onSizeChange = (size: number, callback?: Function, ...args: any[]) => {
    currentPage.value = 0;
    pageSize.value = size;

    callback && callback.call(this, ...args);
  };

  const onSearchChange = (callback?: Function, ...args: any[]) => {
    onPageChange(0, callback, ...args);
  };

  return {
    total,
    sizeList,
    currentPage,
    pageSize,
    onPageChange,
    onSizeChange,
    onSearchChange,
  };
};
