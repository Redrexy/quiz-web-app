import styles from './PrimaryButton.module.css';
import { size } from '../../theme';

export const PrimaryButton = ({ text, onClick }) => {
  return (
    <button type="button" className={styles.primaryButton} onClick={onClick}>
      <span
        className={styles.buttonText}
        style={{ fontSize: size.fonts.large }}
      >
        {text}
      </span>
    </button>
  );
};
