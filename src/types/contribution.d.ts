export type TContributionDayType = {
  contributionCount: number;
  date: string;
};

export type TContributionWeekType = {
  contributionDays: TContributionDayType[];
};

export interface IContributionInfo {
  totalContributions: number;
  weeks: TContributionWeekType[];
}

export interface IUserContributionData {
  contribution: {
    date: string;
    count: number;
    level: number;
  }[];
  total: {
    lastYear: number;
  };
}
