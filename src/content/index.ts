import { common as commonNl } from './common/nl';
import { page as homeNl } from './home/nl';
import { page as agendaNl } from './agenda/nl';

export type PageKey = 'home' | 'agenda';

export function getCommonContent() {
  return commonNl;
}

export function getPageContent(page: 'home'): typeof homeNl;
export function getPageContent(page: 'agenda'): typeof agendaNl;
export function getPageContent(page: PageKey) {
  const pages = { home: homeNl, agenda: agendaNl };
  return pages[page];
}
