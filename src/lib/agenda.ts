const LOCALE = 'nl-NL';
const TIME_ZONE = 'Europe/Amsterdam';

export type AgendaEventInput = {
  id: string;
  startDatetime: string;
  endDatetime: string;
  name: string;
  location: string;
  url: string;
  urlLabel: string;
};

export type AgendaEvent = AgendaEventInput & {
  start: Date;
  end: Date;
  monthKey: string;
  monthLabel: string;
  dateLabel: string;
  timeLabel: string;
  idx: number;
};

export type AgendaGroup = {
  key: string;
  label: string;
  startIdx: number;
  endIdx: number;
  events: AgendaEvent[];
};

const weekdayFormatter = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: TIME_ZONE });
const dateFormatter = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'short', timeZone: TIME_ZONE });
const timeFormatter = new Intl.DateTimeFormat(LOCALE, {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: TIME_ZONE,
});
const monthFormatter = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: TIME_ZONE });
const monthKeyFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  timeZone: TIME_ZONE,
});

function parseEventDate(event: AgendaEventInput, field: 'startDatetime' | 'endDatetime') {
  const value = event[field];
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid agenda event ${field} for "${event.name}" (${event.id}): ${value}`);
  }

  return date;
}

function getMonthKey(date: Date) {
  const parts = monthKeyFormatter.formatToParts(date);
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;

  if (!year || !month) {
    throw new Error(`Could not format agenda month key for date: ${date.toISOString()}`);
  }

  return `${year}-${month}`;
}

export function getFormattedAgendaEvents(events: readonly AgendaEventInput[]) {
  return events.map((event) => {
    const start = parseEventDate(event, 'startDatetime');
    const end = parseEventDate(event, 'endDatetime');

    if (end < start) {
      throw new Error(`Agenda event "${event.name}" (${event.id}) ends before it starts`);
    }

    return {
      ...event,
      start,
      end,
      monthKey: getMonthKey(start),
      monthLabel: monthFormatter.format(start),
      dateLabel: `${weekdayFormatter.format(start)} · ${dateFormatter.format(start).replaceAll('.', '')}`,
      timeLabel: `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`,
    };
  });
}

export function getUpcomingAgendaEvents(events: readonly AgendaEventInput[], now = new Date()) {
  return getFormattedAgendaEvents(events)
    .filter((event) => event.end >= now)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .map((event, idx) => ({ ...event, idx }));
}

export function getArchivedAgendaEvents(events: readonly AgendaEventInput[], now = new Date()) {
  return getFormattedAgendaEvents(events)
    .filter((event) => event.end < now)
    .sort((a, b) => b.start.getTime() - a.start.getTime())
    .map((event, idx) => ({ ...event, idx }));
}

export function groupAgendaEventsByMonth(events: readonly AgendaEvent[]) {
  return events.reduce<AgendaGroup[]>((acc, event) => {
    const last = acc.at(-1);

    if (last?.key === event.monthKey) {
      last.events.push(event);
      last.endIdx = event.idx;
    } else {
      acc.push({
        key: event.monthKey,
        label: event.monthLabel,
        startIdx: event.idx,
        endIdx: event.idx,
        events: [event],
      });
    }

    return acc;
  }, []);
}
