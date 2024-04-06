export type TContributionDayType = {
  contributionCount: any;
  date: any;
};

export type TContributionWeekType = {
  contributionDays: TContributionDayType[];
};

export interface IContributionInfo {
  totalContributions: number;
  weeks: TContributionWeekType[];
}

export interface IUserContributionData {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: IContributionInfo;
      };
    };
  };
  errors?: {
    type: string;
    path: any[];
    locations: any[];
    message: string;
  }[];
}
