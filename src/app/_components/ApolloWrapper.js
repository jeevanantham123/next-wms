// "use client";

// import { ApolloLink, HttpLink } from "@apollo/client";
// import {
//   ApolloNextAppProvider,
//   NextSSRInMemoryCache,
//   NextSSRApolloClient,
//   SSRMultipartLink,
// } from "@apollo/experimental-nextjs-app-support/ssr";

// function makeClient() {
//   const httpLink = new HttpLink({
//     uri: "http://207.180.215.123:8002/graphql/",
//     fetchOptions: { cache: "no-store" },
//   });

//   return new NextSSRApolloClient({
//     cache: new NextSSRInMemoryCache(),
//     link:
//       typeof window === "undefined"
//         ? ApolloLink.from([
//             new SSRMultipartLink({
//               stripDefer: true,
//             }),
//             httpLink,
//           ])
//         : httpLink,
//   });
// }

// export function ApolloWrapper({ children }) {
//   return (
//     <ApolloNextAppProvider makeClient={makeClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }
// app/client/layout.tsx
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
