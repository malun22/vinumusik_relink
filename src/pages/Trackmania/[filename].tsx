import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { transferRoutes } from "tranferRoutes";

interface Params extends ParsedUrlQuery {
  filename: string;
}

const FileTransferPage = () => {
  // This component doesn't need to render anything since it's used for server-side redirection.
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const file = (params as Params)?.filename;

  if (!(file in transferRoutes)) {
    return {
      notFound: true,
    };
  }

  const newId = transferRoutes[file];

  if (!newId) {
    return {
      notFound: true,
    };
  }

  const url = `https://maniapark.com/mod/${newId}/download?.zip`;

  return {
    redirect: {
      destination: url,
      permanent: true, // Set to true for permanent redirection
    },
  };
};

export default FileTransferPage;
