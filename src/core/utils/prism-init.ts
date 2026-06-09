import Prism from 'prismjs';

export function initPrism() {
  if (typeof window !== 'undefined') {
    (window as typeof window & { Prism?: typeof Prism }).Prism = Prism;
  } else {
    (globalThis as typeof globalThis & { Prism?: typeof Prism }).Prism = Prism;
  }
}

// Auto-run on import as well
initPrism();
