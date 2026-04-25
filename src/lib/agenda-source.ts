import { getPageContent } from '../content';
import type { AgendaEventInput } from './agenda';

type DirectusEvent = {
  id: string | number;
  name: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
  external_url?: string | null;
  external_url_label?: string | null;
};

type DirectusListResponse<T> = {
  data?: T[];
};

let cache: AgendaEventInput[] | null = null;
let hasWarnedAboutLocalFallback = false;

function getDirectusConfig() {
  const url = import.meta.env.DIRECTUS_URL;
  const token = import.meta.env.DIRECTUS_TOKEN;

  if (!url || !token) return null;

  return {
    url: String(url).replace(/\/$/, ''),
    token: String(token),
  };
}

function getLocalAgendaEvents() {
  if (!hasWarnedAboutLocalFallback) {
    console.warn('[agenda] DIRECTUS_URL and DIRECTUS_TOKEN are not set. Using local agenda fallback data.');
    hasWarnedAboutLocalFallback = true;
  }

  return getPageContent('agenda').events;
}

function toAgendaEvent(event: DirectusEvent): AgendaEventInput {
  return {
    id: String(event.id),
    name: event.name,
    location: event.location,
    startDatetime: event.start_datetime,
    endDatetime: event.end_datetime,
    url: event.external_url ?? '',
    urlLabel: event.external_url_label ?? '',
  };
}

async function fetchDirectusAgendaEvents() {
  const config = getDirectusConfig();
  if (!config) return getLocalAgendaEvents();
  if (cache) return cache;

  const url = new URL('/items/events', config.url);
  url.searchParams.set('filter[status][_eq]', 'published');
  url.searchParams.set('fields', [
    'id',
    'name',
    'location',
    'start_datetime',
    'end_datetime',
    'external_url',
    'external_url_label',
  ].join(','));
  url.searchParams.set('sort', 'start_datetime');
  url.searchParams.set('limit', '-1');

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`[agenda] Directus returned ${response.status} ${response.statusText} for events`);
  }

  const payload = await response.json() as DirectusListResponse<DirectusEvent>;
  cache = (payload.data ?? []).map(toAgendaEvent);

  return cache;
}

export async function getAgendaEvents() {
  return fetchDirectusAgendaEvents();
}
