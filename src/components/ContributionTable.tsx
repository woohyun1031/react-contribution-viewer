import React from 'react';
import label from '../constants/label';
import {
  IContributionInfo,
  TContributionWeekType,
} from '../types/contribution';
import {
  convertContributionsToWeeks,
  generateEmptyContributions,
  getMonthLabels,
} from '../utils/contribution';
import styles from '../styles/style.module.css';
import { getClassName } from '../utils/common';
import { Contribution } from '../api/fetchContribution';

export interface IContributionTableProps extends IContributionInfo {
  isDark?: boolean;
}

export default function ContributionTable({
  contributions,
}: {
  contributions: Array<Contribution>;
}) {
  if (!contributions.length) {
    contributions = generateEmptyContributions();
  }

  const weeks = convertContributionsToWeeks(contributions);
  const lightColor = {
    'gray-300': '#d1d5db',
    'gray-700': '#374151',
  };

  function renderSideTable(_weekArray: TContributionWeekType[]) {
    const headerFont = {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: 'bold',
    };

    const cellFont = {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: 'bold',
    };

    const cellBorder = {
      border: '1px',
      borderColor: 'transparent',
    };

    return (
      <>
        <thead>
          <tr
            style={{ height: '30px' }}
            className={getClassName('row', [styles.table_row])}
          >
            <td
              className={getClassName('cell', [
                styles.table_cell,
                styles.table_sticky_cell,
              ])}
            >
              <span
                style={{ ...headerFont, visibility: 'hidden' }}
                className={getClassName('cell', [styles.table_sticky_cell])}
              >
                Day
              </span>
            </td>
          </tr>
        </thead>

        <tbody>
          {label.week.map((day, index) => {
            const isOdd = Boolean(index % 2);
            return (
              <tr key={day} className={getClassName('row', [styles.table_row])}>
                <td
                  style={{ ...cellBorder }}
                  className={getClassName('cell', [
                    styles.table_cell,
                    styles.table_sticky_cell,
                  ])}
                >
                  <span
                    style={{
                      visibility: isOdd ? 'visible' : 'hidden',
                      verticalAlign: 'middle',
                      ...cellFont,
                    }}
                  >
                    {day}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </>
    );
  }

  function renderTableHeader(_weekArray: TContributionWeekType[]) {
    const headerStyle = {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: 'bold',
    };
    return (
      <tr
        style={{ height: '30px' }}
        className={getClassName('row', [styles.table_row])}
      >
        {getMonthLabels(_weekArray).map(({ label: text, colSpan }) => (
          <td
            colSpan={colSpan}
            style={{ textAlign: 'start' }}
            className={getClassName('cell', [styles.table_cell])}
          >
            <span style={headerStyle}>{text}</span>
          </td>
        ))}
      </tr>
    );
  }

  function renderTableBody(_weekArray: TContributionWeekType[]) {
    const cellBorder = {
      border: `1px solid ${lightColor['gray-300']}`,
      borderRadius: '0.125rem',
    };

    return label.week.map((day, index) => {
      return (
        <tr key={day} className={getClassName('row', [styles.table_row])}>
          {_weekArray
            .filter((week) => !!week.contributionDays?.[index])
            .map((week) => {
              const target = week.contributionDays[index];
              const cellFont = target.contributionCount
                ? {
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                  }
                : {
                    fontSize: '0.75rem',
                    lineHeight: '1rem',
                  };
              return (
                <td
                  key={target.date}
                  style={{ cursor: 'pointer', ...cellBorder }}
                  className={getClassName('cell', [
                    styles.table_cell,
                    styles.table_day_cell,
                  ])}
                >
                  <span style={{ ...cellFont }}>
                    {target.contributionCount}
                  </span>
                </td>
              );
            })}
        </tr>
      );
    });
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <article className={getClassName('article', [styles.article])}>
        <table className={getClassName('side_table', [styles.table])}>
          {renderSideTable(weeks)}
        </table>
      </article>

      <article
        className={getClassName('article', [
          styles.article,
          styles.main_article,
        ])}
      >
        <table className={getClassName('main_table', [styles.table])}>
          <thead>{renderTableHeader(weeks)}</thead>
          <tbody>{renderTableBody(weeks)}</tbody>
        </table>
      </article>
    </div>
  );
}
