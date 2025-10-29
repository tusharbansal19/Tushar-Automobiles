'use client';

import PageLoader from '@/components/PageLoader';

export default function SiteLoading() {
  return (
    <PageLoader

      message="Welcome to Tushar Automobiles"
      duration={2500}
      
    // showProgress={true}
    />
  );
}