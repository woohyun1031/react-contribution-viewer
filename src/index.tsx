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
  extends Omit<IContributionTableProps, 'data' | 'total'> {
  username: string;
  serverData?: IContributionInfo;
}

const ContributionWrapper = ({
  username,
  serverData,
  ...props
}: IViewerWrapperProps) => {
  const [contributions, setContributions] = React.useState<
    TContributionWeekType[]
  >([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setLoading(true);
    if (serverData && serverData.weeks.length) {
      try {
        setContributions(serverData.weeks);
        setTotal(serverData.totalContributions);
      } finally {
        setLoading(false);
      }
    } else {
      fetchContribution({ username })
        .then((res) => {
          const weeks = convertContributionsToWeeks(res.contributions);
          setContributions(weeks);
          setTotal(res.total['lastYear'] ?? 0);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    }
  }, []);

  if (error || loading) {
    error && console.error(error);
    return (
      <ContributionTable
        data={[]}
        total={total}
        isHeader={props.isHeader}
        isDark={props.isDark}
        {...props}
      />
    );
  }
  return (
    <ContributionTable
      data={contributions}
      total={total}
      isHeader={props.isHeader}
      isDark={props.isDark}
      {...props}
    />
  );
};

export default ContributionWrapper;
