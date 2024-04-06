import React from 'react';
import {
  ContributionResponse,
  fetchContribution,
} from './api/fetchContribution';
import ContributionTable from './components/ContributionTable';

export interface IViewerWrapperProps {
  username: string;
}

const ContributionWrapper = ({ username }: IViewerWrapperProps) => {
  const [data, setData] = React.useState<ContributionResponse>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setLoading(true);
    fetchContribution({ username })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (error || loading) {
    error && console.log(error);
    return (
      <div style={{ width: '100%' }}>
        <ContributionTable contributions={[]} />
      </div>
    );
  }
  return (
    <div style={{ width: '100%' }}>
      <ContributionTable contributions={data?.contributions ?? []} />
    </div>
  );
};

export default ContributionWrapper;
