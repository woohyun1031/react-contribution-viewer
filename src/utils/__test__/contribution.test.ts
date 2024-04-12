import {
  generateEmptyContributions,
  convertContributionsToWeeks,
  getMonthLabels,
} from '../contribution';
import dayjs from 'dayjs';
import { TContributionWeekType } from '../../types/contribution';
import { TContribution } from '../../api/fetchContribution';

describe('generateEmptyContributions function', () => {
  it('should generate empty contributions for the current year', () => {
    const current = dayjs().startOf('year');
    const emptyContributions = generateEmptyContributions();

    let startDt = current;
    let endDt = dayjs().endOf('year');
    let index = 0;

    while (!startDt.isAfter(endDt)) {
      const expectedDate = startDt.format('YYYY-MM-DD');
      const expectedCount = 0;

      expect(emptyContributions[index]).toEqual({
        date: expectedDate,
        count: expectedCount,
      });

      startDt = startDt.add(1, 'day');
      index++;
    }
  });
});

describe('getMonthLabels function', () => {
  it('should return an empty array when weeks array is empty', () => {
    const weeks: TContributionWeekType[] = [];
    const labels = getMonthLabels(weeks);
    expect(labels).toEqual([]);
  });
});

describe('convertContributionsToWeeks function', () => {
  it('should return an empty array when contributions array is empty', () => {
    const contributions: TContribution[] = [];
    const weeks = convertContributionsToWeeks(contributions);
    expect(weeks).toEqual([]);
  });
});
