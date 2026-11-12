import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });
Object.defineProperty(globalThis, 'sessionStorage', { value: localStorageMock, writable: true });

afterEach(() => {
  localStorageMock.clear();
});

vi.mock('framer-motion', () => {
  const motionProxy = new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === '__esModule') return undefined;
        const Component = ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => {
          const filteredProps = Object.fromEntries(
            Object.entries(props).filter(([k]) =>
              !k.startsWith('on') && !k.startsWith('initial') && !k.startsWith('animate') &&
              !k.startsWith('exit') && !k.startsWith('transition') && k !== 'whileInView' &&
              k !== 'viewport' && k !== 'whileTap' && k !== 'whileHover' &&
              k !== 'layout' && k !== 'layoutId' && k !== 'drag' && k !== 'dragConstraints' &&
              k !== 'variants' && k !== 'custom' && k !== 'style' && k !== 'ref'
            )
          );
          return <div {...filteredProps}>{children}</div>;
        };
        return Component;
      },
    }
  );
  return {
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useInView: () => true,
  };
});

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(),
    confirm: vi.fn(),
  },
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  );
  MockLink.displayName = 'Link';
  return { default: MockLink };
});

vi.mock('next/image', () => {
  const MockImage = (props: Record<string, unknown>) => {
    const { alt, ...rest } = props;
    return <img alt={alt as string} {...rest} />;
  };
  MockImage.displayName = 'Image';
  return { default: MockImage };
});
