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

export async function fetchContribution({
  username,
}: IFetchContributionProps): Promise<IContributionResponse> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    {
      method: 'GET',
    },
  );
  const responseJSON: IContributionResponse | IErrorResponse =
    await response.json();

  if (!response.ok)
    throw Error(
      `Fetching GitHub contribution data for "${username}" failed: ${
        (responseJSON as IErrorResponse).error
      }`,
    );

  return responseJSON as IContributionResponse;
}
