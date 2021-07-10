import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://pva-data.gigalixirapp.com/api'
      : 'http://localhost:9001/api',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('pvaDataJwt')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
})

const Apollo = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default Apollo
