import { TContribution } from '../api/fetchContribution';
import { TContributionWeekType } from '../types/contribution';
export declare const getMonthLabels: (weeks: Array<TContributionWeekType>) => {
    label: string;
    colSpan: number;
}[];
export declare function generateEmptyContributions(): {
    date: string;
    count: number;
}[];
export declare function convertContributionsToWeeks(contributions: Array<TContribution>): Array<TContributionWeekType>;
