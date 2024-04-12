import React, { CSSProperties } from 'react';
import label from '../constants/label';
import { TContributionWeekType } from '../types/contribution';
import {
  convertContributionsToWeeks,
  generateEmptyContributions,
  getMonthLabels,
} from '../utils/contribution';
import styles from '../styles/style.module.css';
import { getClassName } from '../utils/common';
import { colorMode } from '../constants/color';

export interface IContributionTableProps {
  data: Array<TContributionWeekType>;
  total: number;
  isDark?: boolean;
  isHeader?: boolean;
  style?: CSSProperties;
  renderHeader?: (value: number) => React.ReactElement | JSX.Element;
}

export default function InnerTable({
  data = [],
  isDark = false,
  isHeader = false,
  total = 0,
  style: styleProps = {},
  renderHeader,
}: IContributionTableProps) {
  if (!data.length) {
    const emptyContributions = generateEmptyContributions();
    data = convertContributionsToWeeks(emptyContributions);
  }

  const colorTheme = colorMode[isDark ? 'dark' : 'light'];

  function renderSideTable(_weekArray: TContributionWeekType[]) {
    const borderStyle = {
      borderStyle: 'hidden',
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
              style={{ paddingBottom: '0.5rem' }}
              className={getClassName('cell', [
                styles.table_cell,
                styles.table_sticky_cell,
              ])}
            >
              <span
                style={{ visibility: 'hidden' }}
                className={getClassName('cell', [
                  styles.table_sticky_cell,
                  styles.small_font,
                  styles.bold_font,
                ])}
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
                  style={{ ...borderStyle }}
                  className={getClassName('cell', [
                    styles.table_cell,
                    styles.table_sticky_cell,
                    styles.table_border_cell,
                    styles.small_font,
                    styles.bold_font,
                  ])}
                >
                  <span
                    style={{
                      visibility: isOdd ? 'visible' : 'hidden',
                      verticalAlign: 'middle',
                      color: colorTheme.bold,
                    }}
                    className={getClassName('cell', [
                      styles.small_font,
                      styles.bold_font,
                    ])}
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
    return (
      <tr
        style={{ height: '30px' }}
        className={getClassName('row', [styles.table_row])}
      >
        {getMonthLabels(_weekArray).map(({ label: text, colSpan }, index) => (
          <td
            key={`${text}__${index}`}
            colSpan={colSpan}
            style={{ textAlign: 'start', paddingBottom: '0.5rem' }}
            className={getClassName('cell', [styles.table_cell])}
          >
            <span
              style={{ color: colorTheme.bold }}
              className={getClassName('text', [
                styles.small_font,
                styles.bold_font,
              ])}
            >
              {text}
            </span>
          </td>
        ))}
      </tr>
    );
  }

  function renderTableBody(_weekArray: TContributionWeekType[]) {
    const borderStyle = {
      borderStyle: 'solid',
      borderColor: colorTheme.light,
    };

    return label.week.map((day, index) => {
      return (
        <tr key={day} className={getClassName('row', [styles.table_row])}>
          {_weekArray
            .filter((week) => !!week.contributionDays?.[index])
            .map((week) => {
              const target = week.contributionDays[index];
              const countAttribute = target.contributionCount
                ? { className: styles.large_font, color: colorTheme.bold }
                : { className: styles.small_font, color: colorTheme.light };

              return (
                <td
                  key={target.date}
                  style={{ cursor: 'pointer', ...borderStyle }}
                  className={getClassName('cell', [
                    styles.table_cell,
                    styles.table_day_cell,
                    styles.table_border_cell,
                  ])}
                >
                  <span
                    style={{ color: countAttribute.color }}
                    className={getClassName('text', [countAttribute.className])}
                  >
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
    <>
      {isHeader && renderHeader ? renderHeader(total) : undefined}
      <div style={{ display: 'flex', width: '100%', ...styleProps }}>
        <article className={getClassName('article', [styles.article])}>
          <table className={getClassName('side_table', [styles.table])}>
            {renderSideTable(data)}
          </table>
        </article>

        <article
          className={getClassName('article', [
            styles.article,
            styles.main_article,
          ])}
        >
          <table
            style={{
              marginBottom: '2rem',
            }}
            className={getClassName('main_table', [styles.table])}
          >
            <thead>{renderTableHeader(data)}</thead>
            <tbody>{renderTableBody(data)}</tbody>
          </table>
        </article>
      </div>
    </>
  );
}
