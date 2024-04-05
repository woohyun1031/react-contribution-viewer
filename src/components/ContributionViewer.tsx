import React from 'react';
import label from '../constants/label';
import {
  initialState,
  MtotalContributions,
  Mweeks,
} from '../mocks/contribution';
import { IContributionInfo } from '../types/contribution';
import { getMonthLabels } from '../utils/contribution';

export default function ContributionViewer() {
  const [contributionInfo, setContributionInfo] =
    React.useState<IContributionInfo>(initialState);

  const { totalContributions, weeks } = contributionInfo;

  React.useEffect(() => {
    setContributionInfo({
      totalContributions: MtotalContributions,
      weeks: Mweeks,
    });
  }, []);

  return (
    <section>
      <div>
        <span>{totalContributions}</span>
        <span>{` contributions in the last year`}</span>
      </div>
      <article>
        <table>
          <thead>
            <tr>
              <td>
                <span>Day of Week</span>
              </td>
              {getMonthLabels(weeks).map(({ label: text, colSpan }) => (
                <td colSpan={colSpan}>
                  <span>{text}</span>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {label.week.map((day, index) => {
              const isOdd = Boolean(index % 2);
              return (
                <tr key={day}>
                  <td>
                    <span>{isOdd && day}</span>
                  </td>
                  {weeks
                    ? weeks
                        .filter((week) => !!week.contributionDays?.[index])
                        .map((week) => {
                          const target = week.contributionDays[index];
                          return (
                            <td key={target.date}>
                              <span>{target.contributionCount}</span>
                            </td>
                          );
                        })
                    : [...new Array(53).fill(0)].map(() => (
                        <td>
                          <span>0</span>
                        </td>
                      ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
    </section>
  );
}
