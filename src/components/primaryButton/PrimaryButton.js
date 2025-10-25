import styles from './PrimaryButton.module.css';
import { size } from '../../theme';

export const PrimaryButton = ({ text, onClick, color }) => {
  return (
    <button
      type="button"
      className={styles.primaryButton}
      style={{ background: color }}
      onClick={onClick}
    >
      <span
        className={styles.buttonText}
        style={{ fontSize: size.fonts.large }}
      >
        {text}
      </span>
    </button>
  );
};
