import styles from './PrimaryButton.module.css';
import { color, size } from '../../theme';

export const PrimaryButton = ({ text, onClick }) => {
  return (
    <button
      type="button"
      className={styles.primaryButton}
      style={{ backgroundColor: color.button.primaryColor }}
      onClick={onClick}
    >
      <span
        className={styles.buttonText}
        style={{ fontSize: size.fonts.large, color: color.text.primaryWhite }}
      >
        {text}
      </span>
    </button>
  );
};
