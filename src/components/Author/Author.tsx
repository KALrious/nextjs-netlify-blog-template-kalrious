import { AuthorContent } from '../../lib/authors';
import styles from './Author.module.scss';

type Props = {
  author: AuthorContent;
};
const Author = ({ author }: Props) => {
  return (
    <>
      <span className={styles.author}>{author.name}</span>
    </>
  );
};

export default Author;
