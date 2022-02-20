import Head from "next/head";

interface PageHeadProps {
  title: string;
}

export const PageHead: React.FC<PageHeadProps> = ({ title }) => {
  return (
    <Head>
      <title>Voices | {title}</title>
    </Head>
  );
};
