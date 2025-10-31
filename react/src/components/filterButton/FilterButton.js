import styles from './FilterButton.module.css';
import { size } from '../../theme';

export const FilterButton = ({ text, onClick, backgroundColor }) => {
  return (
    <button
      className={styles.filterButton}
      onClick={onClick}
      style={{ backgroundColor: backgroundColor }}
    >
      <span
        className={styles.filterButtonText}
        style={{ fontSize: size.fonts.xsmall }}
      >
        {text}
      </span>
    </button>
  );
};
