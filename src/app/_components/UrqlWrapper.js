'use client';

import { useMemo } from 'react';
import { UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient } from '@urql/next';

export default function UrqlWrapper({ children }) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined',
    });
    const client = createClient({
      url: 'http://207.180.215.123:8002/graphql/',
      exchanges: [cacheExchange, ssr, fetchExchange],
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}