import { IUserContributionData } from '../types/contribution';

export interface IFetchContributionProps {
  username: string;
}

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionResponse {
  total: {
    [year: string]: number;
  };
  contributions: Array<Contribution>;
}

export async function fetchContribution({
  username,
}: IFetchContributionProps): Promise<ContributionResponse> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        method: 'GET',
      },
    );
    const responseJSON = (await response.json()) as ContributionResponse;
    return responseJSON;
  } catch (error: any) {
    throw new Error(`${error}`);
  }
}
