import React from 'react';
import styles from '../../../public/styles/content.module.css';
import Author from '../Author/Author';
import Copyright from '../Copyright';
import Date from '../Date';
import Layout from '../Layout';
import BasicMeta from '../meta/BasicMeta';
import JsonLdMeta from '../meta/JsonLdMeta';
import OpenGraphMeta from '../meta/OpenGraphMeta';
import TwitterCardMeta from '../meta/TwitterCardMeta';
import { SocialList } from '../SocialList';
import { getAuthor } from '../../lib/authors';

type Props = {
  title: string;
  date: Date;
  slug: string;
  author: string;
  description?: string;
  children: React.ReactNode;
};
const CheatSheetLayout = ({ title, date, slug, author, description = '', children }: Props) => {
  const keywords = [''];
  const authorName = getAuthor(author).name;
  return (
    <Layout>
      <BasicMeta url={`/cheat-sheets/${slug}`} title={title} keywords={keywords} description={description} />
      <TwitterCardMeta url={`/cheat-sheets/${slug}`} title={title} description={description} />
      <OpenGraphMeta url={`/cheat-sheets/${slug}`} title={title} description={description} />
      <JsonLdMeta
        url={`/cheat-sheets/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={authorName}
        description={description}
      />
      <div>
        <article>
          <header>
            <h1>{title}</h1>
            <div>
              <div>
                <Date date={date} />
              </div>
              <div>
                <Author author={getAuthor(author)} />
              </div>
            </div>
          </header>
          <div className={styles.content}>{children}</div>
        </article>
        <footer>
          <div>
            <SocialList />
          </div>
          <Copyright />
        </footer>
      </div>
    </Layout>
  );
};

export default CheatSheetLayout;
