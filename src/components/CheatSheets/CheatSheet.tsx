import { FC } from 'react';
import Link from 'next/link';
import Date from "../Date";
import {parseISO} from "date-fns";
import styles from  './CheatSheet.module.scss';

export type Type = {
    date: string;
    title: string;
    slug: string;
    fullPath: string;
};

const CheatSheet: FC<Type> = ({ date,title,slug,fullPath }) => (
    <div className={styles.cheatsheet}>
        <Link href={'/cheat-sheets/' + slug}>
            <a>
                <Date date={parseISO(date)} />
                <h2>{title}</h2>
            </a>
        </Link>
    </div>
);

export default CheatSheet;
