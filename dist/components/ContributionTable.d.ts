import React, { CSSProperties } from 'react';
import { TContributionWeekType } from '../types/contribution';
export interface IContributionTableProps {
    data: Array<TContributionWeekType>;
    total: number;
    isDark?: boolean;
    isHeader?: boolean;
    style?: CSSProperties;
    renderHeader?: (value: number) => React.ReactElement | JSX.Element;
}
export default function ContributionTable({ data, isDark, isHeader, total, style: styleProps, renderHeader, }: IContributionTableProps): React.JSX.Element;
