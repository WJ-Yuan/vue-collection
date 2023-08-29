import type { DirectiveBinding, App, ObjectDirective } from 'vue';
import { isClient, withInstallDirective } from './utils';

interface ObserverHTMLElement extends HTMLImageElement {
  _observer?: Observer;
}

class Observer {
  private _observer: IntersectionObserver | null;

  constructor(el: ObserverHTMLElement, options: IntersectionObserverInit) {
    this._observer = null;
    this._observer = this.init(options);
    this._observer.observe(el);
  }

  get observer() {
    return this._observer;
  }

  private init(options: IntersectionObserverInit) {
    return new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        if (item.isIntersecting) {
          const target = item.target as HTMLImageElement;
          (target as any).src = target.dataset.src;

          this._observer?.unobserve(target);
        }
      }, options);
    });
  }

  update(el: ObserverHTMLElement, options: IntersectionObserverInit) {
    this.dispose(el);
    this._observer = this.init(options);
    this._observer.observe(el);
  }

  dispose(el: ObserverHTMLElement) {
    if (this._observer) {
      this._observer.unobserve(el);
      this._observer.disconnect();
      delete el._observer;
      this._observer = null;
    }
  }
}

function addObserver(
  el: ObserverHTMLElement,
  binding: DirectiveBinding<IntersectionObserverInit & { src?: string }>,
) {
  // check element type
  if (el.tagName !== 'IMG') {
    throw Error('only img element can use this directive');
  }

  const options = binding.value || {};
  // handle real img src
  const realSrc = options.src || '';
  if (!realSrc || typeof realSrc !== 'string') {
    throw Error('image src is required as a string');
  }
  el.dataset.src = realSrc;
  // wash options
  delete options.src;
  // observer el
  el._observer = new Observer(el, options);
}

const directive: ObjectDirective<
  ObserverHTMLElement,
  IntersectionObserverInit & { src?: string }
> = {
  mounted(el, binding) {
    addObserver(el, binding);
  },

  updated(el, binding) {
    addObserver(el, binding);
  },

  beforeUnmount(el) {
    const observer = el._observer;

    if (observer) {
      observer.dispose(el);
    }
  },
};

export const lazyImage = withInstallDirective(directive, 'lazy-image');

export default {
  install(app: App) {
    if (!isClient) return;

    app.directive('lazy-image', directive);
  },
  directive,
};
