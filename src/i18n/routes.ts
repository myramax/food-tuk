export type Locale = 'nl';

export const routes = {
  home: { nl: '/' },
  agenda: { nl: '/agenda' },
} as const;

export type NavigationRouteKey = keyof typeof routes;
