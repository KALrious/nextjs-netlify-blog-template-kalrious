import { FC } from 'react';

type CheatSheet = {
  date: string;
  title: string;
  slug: string;
  fullPath: string;
};

type Type = {
  cheatSheets: CheatSheet[];
};

const CheatSheetsList: FC<Type> = ({ cheatSheets }) => (
  <div>
    <ul>
      {cheatSheets.map(cheatSheet => (
        <li>{cheatSheet.title}</li>
      ))}
    </ul>
  </div>
);

export default CheatSheetsList;
