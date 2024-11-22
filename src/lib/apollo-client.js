import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://207.180.215.123:8002/graphql/",
  cache: new InMemoryCache(),
});

export default client;
