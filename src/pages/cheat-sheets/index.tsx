import Layout from '../../components/Layout';
import BasicMeta from '../..//components/meta/BasicMeta';
import OpenGraphMeta from '../..//components/meta/OpenGraphMeta';
import TwitterCardMeta from '../..//components/meta/TwitterCardMeta';
import { GetStaticProps } from 'next';
import { listContent } from '../../lib/cheat-sheet';
import config from '../../lib/config';
import CheatSheetsList from '../../components/CheatSheets/CheatSheetsList';

const Index = ({ cheatSheets }) => {
  const url = '/cheat-sheet';
  const title = 'All cheat sheet';
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <CheatSheetsList cheatSheets={cheatSheets} />
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const cheatSheets = listContent(1, config.cheat_sheets_per_page);
  console.log('réussi le call', cheatSheets);
  return {
    props: {
      cheatSheets,
    },
  };
};
