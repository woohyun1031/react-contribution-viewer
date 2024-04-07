import React from 'react';
import { type IContributionTableProps } from './components/ContributionTable';
import { IContributionInfo } from './types/contribution';
export interface IViewerWrapperProps extends Omit<IContributionTableProps, 'data' | 'total'> {
    username: string;
    serverData?: IContributionInfo;
}
declare const ContributionWrapper: ({ username, serverData, ...props }: IViewerWrapperProps) => React.JSX.Element;
export default ContributionWrapper;
