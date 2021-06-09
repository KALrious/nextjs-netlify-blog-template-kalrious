import { FC } from 'react';
import styles from 'Avatar.module.scss';

const Avatar: FC = ({ children }) => {
  return (
    <div>
      <img src="images/kalrious.png" />
      {children}
    </div>
  );
};

export default Avatar;
