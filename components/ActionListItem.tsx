'use client';

import styles from '@components/ActionListItem.module.scss';
import * as Utilities from '@common/utilities';
import Link from 'next/link';

interface ActionListItemProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const ActionListItem: React.FC<ActionListItemProps> = ({ children, icon, href, onClick, isActive }) => {
  const className = Utilities.classNames(styles.item, isActive && styles.active);

  if (href) {
    return (
      <Link href={href} className={className}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.text}>{children}</div>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{children}</div>
    </button>
  );
};

export default ActionListItem;
