export interface IFetchContributionProps {
    username: string;
}
export type TContribution = {
    date: string;
    count: number;
    level?: 0 | 1 | 2 | 3 | 4;
};
export interface IContributionResponse {
    total: {
        [year: string]: number;
    };
    contributions: Array<TContribution>;
}
export interface IErrorResponse {
    error: string;
}
export declare function fetchContribution({ username, }: IFetchContributionProps): Promise<IContributionResponse>;
