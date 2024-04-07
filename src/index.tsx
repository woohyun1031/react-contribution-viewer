import React from 'react';
import {
  IContributionResponse,
  fetchContribution,
} from './api/fetchContribution';
import ContributionTable, {
  type IContributionTableProps,
} from './components/ContributionTable';
import { IContributionInfo, TContributionWeekType } from './types/contribution';
import { convertContributionsToWeeks } from './utils/contribution';

export interface IViewerWrapperProps
  extends Omit<IContributionTableProps, 'data'> {
  username: string;
  serverData?: IContributionInfo;
  isHeader?: boolean;
}

const ContributionWrapper = ({
  username,
  isHeader,
  isDark = false,
  serverData,
  ...props
}: IViewerWrapperProps) => {
  const [contributions, setContributions] = React.useState<
    TContributionWeekType[]
  >([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setLoading(true);
    if (serverData && serverData.weeks.length) {
      try {
        setContributions(serverData.weeks);
      } finally {
        setLoading(false);
      }
    } else {
      fetchContribution({ username })
        .then((res) => {
          const weeks = convertContributionsToWeeks(res.contributions);
          setContributions(weeks);
        })
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, []);

  if (error || loading) {
    error && console.error(error);
    return <ContributionTable data={[]} isDark={isDark} {...props} />;
  }
  return <ContributionTable data={contributions} isDark={isDark} {...props} />;
};

export default ContributionWrapper;
