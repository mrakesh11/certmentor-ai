import { createContext } from 'react';

/**
 * Raw theme context, deliberately isolated in its own module.
 *
 * Fast refresh only works when a file exports components and nothing else,
 * so the provider (a component) and `useTheme` (a hook) each import this
 * context from here instead of co-exporting it.
 */
export const ThemeContext = createContext(null);
