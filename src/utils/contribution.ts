import { DEFAULT_MONTH_LABELS } from '../constants/label';
import { TContribution } from '../api/fetchContribution';
import { TContributionWeekType } from '../types/contribution';
import dayjs from 'dayjs';

export const getMonthLabels = (weeks: Array<TContributionWeekType>) => {
  return weeks
    .reduce<{ label: string; index: number }[]>((prev, cur, idx) => {
      const firstDay = dayjs(cur.contributionDays[0].date).month();
      const currentMonth = DEFAULT_MONTH_LABELS[firstDay];
      const prevMonth = prev[prev.length - 1]?.label;

      if (idx === 0 || currentMonth !== prevMonth) {
        return [...prev, { label: currentMonth, index: idx }];
      }
      return prev;
    }, [])
    .reduce<{ label: string; colSpan: number }[]>(
      (labels, current, idx, origin) => {
        if (idx === origin.length - 1) {
          const span = weeks.length - idx;
          return [
            ...labels,
            {
              label: current.label,
              colSpan: span,
            },
          ];
        }
        const currentSpan = origin[idx + 1].index - current.index;
        return [
          ...labels,
          {
            label: current.label,
            colSpan: currentSpan,
          },
        ];
      },
      [],
    );
};

export function generateEmptyContributions() {
  const start = dayjs().startOf('year');
  const end = dayjs().endOf('year');

  const range = [];
  let current = start;
  while (!current.isAfter(end)) {
    range.push({
      date: current.format('YYYY-MM-DD'),
      count: 0,
    });
    current = current.add(1, 'days');
  }
  return range;
}

export function convertContributionsToWeeks(
  contributions: Array<TContribution>,
): Array<TContributionWeekType> {
  if (!contributions.length) return [];

  const weeks = [] as TContributionWeekType[];

  contributions.forEach((day) => {
    const current = {
      contributionCount: day.count,
      date: day.date,
    };
    if (
      weeks[weeks.length - 1] &&
      weeks[weeks.length - 1].contributionDays.length < 7
    ) {
      return weeks[weeks.length - 1].contributionDays.push(current);
    }
    return weeks.push({ contributionDays: [current] });
  });

  return weeks;
}
