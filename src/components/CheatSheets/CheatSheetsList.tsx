import { FC } from 'react';
import CheatSheet, {Type as CheatSheetType} from "./CheatSheet";
import styles from './CheatSheetsList.module.scss';

type Type = {
  cheatSheets: CheatSheetType[];
};

const CheatSheetsList: FC<Type> = ({ cheatSheets }) => (
  <div className={styles.cheatsheets}>
    <ul className={styles.list} >
      {cheatSheets.map((cheatSheet,i) => (
        <li key={i}>
            <CheatSheet title={cheatSheet.title} slug={cheatSheet.slug} date={cheatSheet.date} fullPath={cheatSheet.fullPath}/>
        </li>
      ))}
    </ul>
      <div/>
  </div>
);

export default CheatSheetsList;
