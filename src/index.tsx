import React from 'react';
import ContributionTable from './components/ContributionTable';
import { initialState } from './mocks/contribution';
import { IContributionInfo } from './types/contribution';

export interface IViewerWrapperProps {
  username: string;
  githubToken: string;
}

const ContributionWrapper = () => {
  const [loading, setLoading] = React.useState(false);
  const [contributionInfo, setContributionInfo] =
    React.useState<IContributionInfo>(initialState);
  const { totalContributions, weeks } = contributionInfo;

  return (
    <div style={{ width: '100%' }}>
      <ContributionTable
        totalContributions={totalContributions}
        weeks={weeks}
        loading={loading}
      />
    </div>
  );
};

export default ContributionWrapper;
