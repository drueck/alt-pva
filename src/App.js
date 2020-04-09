import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { Router, Link } from '@reach/router'
import DivisionsList from './DivisionsList'
import Division from './Division'
import Team from './Team'

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <h1>
      <Link to="/">alt-pva</Link>
    </h1>
    <Router>
      <DivisionsList path="/" />
      <Division path="/division/:slug" />
      <Team path="/division/:divisionSlug/team/:teamSlug/*" />
    </Router>
  </ApolloProvider>
)

export default App
