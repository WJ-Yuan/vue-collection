import { getCurrentInstance } from 'vue';

export const useGlobal = () => {
  return getCurrentInstance()!.appContext.config.globalProperties;
};

export const useInstance = () => {
  return getCurrentInstance()!;
};
