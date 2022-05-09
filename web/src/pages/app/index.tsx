/* eslint-disable @next/next/no-html-link-for-pages */
import {useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useGetProductsQuery } from "../../generated/graphql";
import { withApollo } from "../../lib/withApollo";

function App() {
  const { user } = useUser();

  const { data } = useGetProductsQuery();

  return (
    <div>
      <h1>HELLO</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();

export default withApollo(App);
