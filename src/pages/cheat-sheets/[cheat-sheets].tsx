import {GetStaticPaths, GetStaticProps} from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import {MdxRemote} from 'next-mdx-remote/types';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import fs from 'fs';
import yaml from 'js-yaml';
import {parseISO} from 'date-fns';

import InstagramEmbed from 'react-instagram-embed';
import YouTube from 'react-youtube';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import CheatSheetLayout from '../../components/CheatSheets/CheatSheetLayout';
import {fetchContent} from "../../lib/cheat-sheet";

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: MdxRemote.Source;
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToPostContent = (cheatSheets => {
  let hash = {};
  cheatSheets.forEach(it => (hash[it.slug] = it));
  return hash;
})(fetchContent());

export default function Sheet({ title, dateString, slug, author, description = '', source }: Props) {
  const content = hydrate(source, { components });
  return (
    <CheatSheetLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      author={author}
      description={description}
    >
      {content}
    </CheatSheetLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchContent().map(it => '/cheat-sheets/' + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params['cheat-sheets'] as string;
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, 'utf8');
  const { content, data } = matter(source, {
    engines: { yaml: s => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object },
  });
  const mdxSource = await renderToString(content, { components, scope: data });
  return {
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: '',
      author: data.author,
      source: mdxSource,
    },
  };
};
