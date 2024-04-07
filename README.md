
<p align="center">
  <img width="100%" src="https://github.com/woohyun1031/react-contribution-viewer/assets/94066263/8fdefc99-7e53-42ff-8182-5f9f15aecab3">
</p>

# react-contribution-viewer

- It just simple [github contribution viewer](https://woo1031.vercel.app/about#Commits)

### Installation
- react-contribution-viewer will be available via either npm and yarn.

```bash
npm install react-contribution-viewer
# or
yarn add react-contribution-viewer
```

### Usage - React
- After installation, you can use react-contribution-viewer component in your React application:

```JavaScript
import React from 'react';
import { DarkModeDispatch } from '@contexts/darkModeContext';
import ContributionViewer from 'react-contribution-viewer';

export default function MyContributionViewer() {
  const { darkModeState } = React.useContext(DarkModeDispatch);
  const isDark = React.useMemo(
    () => darkModeState.isDark,
    [darkModeState.isDark],
  );
  
  return (
    <ContributionViewer
      username="woohyun1031"
      isDark={isDark}
      isHeader
      renderHeader={(total) => (
        <div>
          <span>
            {total}
          </span>
          <span>            
            contributions in the last year
          </span>
        </div>
      )}
    />
  );
}

```

### Usage - Next.js (App Router)
- Basically utilizing client-side components, but can seamlessly use data fetched from the server without requiring client-side fetching

```JavaScript
// RSC

export type TContributionDayType = {
  contributionCount: number;
  date: string; // "2024-10-31"
};

export type TContributionWeekType = {
  contributionDays: Array<TContributionDayType>;
};

export interface IContributionInfo {
  totalContributions: number;
  weeks: Array<TContributionWeekType>;
}

export default async function Page() {
  const res = await getContributionList<IContributionInfo>('woohyun1031');
  const data = await res.json();

  return <ContributionTable serverData={data} />
}

```



