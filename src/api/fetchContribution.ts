export interface IFetchContributionProps {
  username: string;
}

export interface Contribution {
  date: string;
  count: number;
  level?: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionResponse {
  total: {
    [year: string]: number;
  };
  contributions: Array<Contribution>;
}

export interface ErrorResponse {
  error: string;
}

export async function fetchContribution({
  username,
}: IFetchContributionProps): Promise<ContributionResponse> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    {
      method: 'GET',
    },
  );
  const responseJSON: ContributionResponse | ErrorResponse =
    await response.json();

  if (!response.ok)
    throw Error(
      `Fetching GitHub contribution data for "${username}" failed: ${
        (responseJSON as ErrorResponse).error
      }`,
    );

  return responseJSON as ContributionResponse;
}
