/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useMeQuery } from "../../graphql/generated/graphql";
import { getServerPageGetProducts, ssrGetProducts } from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

function Home({ data }) {
  // const { user } = useUser();
  const { data: me } = useMeQuery();

  return (
    <div>
      <h1>HELLO</h1>

      {/* <pre>
        {JSON.stringify(data.products, null, 2)}
      </pre> */}

      <pre>
        {JSON.stringify(me, null, 2)}
      </pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) =>
    // getServerPageGetProducts({}, ctx)
    ({
      props: {}
    })
});

export default withApollo(
  ssrGetProducts.withPage()(Home)
);
