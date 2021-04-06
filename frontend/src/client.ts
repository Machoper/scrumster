import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable, Operation } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const cache = new InMemoryCache({});

const request = (operation: Operation) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: `bearer ${accessToken}`
      }
    });
  }
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) {
      return true;
    }
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return Date.now() < exp * 1000;
    } catch (error) {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/refresh_token`, {
      method: "POST",
      credentials: "include"
    });
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    // full control over handling token fetch Error
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);

    // your custom action here
    // user.logout();
  }
}) as any;

export const client = new ApolloClient({
  link: ApolloLink.from([
    tokenRefreshLink,
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: process.env.REACT_APP_API_ENDPOINT! + "/graphql",
      credentials: "include"
    })
  ]),
  cache
});

// access token

let accessToken = "";

export const getAccessToken = () => accessToken;
export const setAccessToken = (token: string) => {
  accessToken = token;
};
