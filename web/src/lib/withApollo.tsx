import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
import { NextPage } from "next";

export const withApollo = (Component: NextPage) =>
  function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    )
}

const getApolloClient = (ssrCache?: NormalizedCacheObject) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3002/graphql',
    fetch,
  });
  
  const cache = new InMemoryCache().restore(ssrCache ?? {});
  
  return new ApolloClient({
    link: from([httpLink]),
    cache,
  });
}
