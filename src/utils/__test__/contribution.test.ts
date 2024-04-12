import { generateEmptyContributions } from '../contribution';
import dayjs from 'dayjs';

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
