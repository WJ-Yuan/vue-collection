import { App, Directive, Plugin } from 'vue';

export const isClient = typeof window !== 'undefined';

export type SFCWithInstall<T> = T & Plugin;

export const withInstallDirective = <T extends Directive>(
  directive: T,
  name: string,
) => {
  (directive as SFCWithInstall<T>).install = (app: App): void => {
    app.directive(name, directive);
  };

  return directive as SFCWithInstall<T>;
};
