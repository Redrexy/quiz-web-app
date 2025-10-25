import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/primaryButton/PrimaryButton';
import { color } from '../../theme';
import styles from './Home.module.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.homePage}
      style={{ background: color.background.primaryBackground }}
    >
      <h1 className={styles.homeTitle}>React Quiz Application</h1>
      <h3 className={styles.homeDetails}>
        Take this test to test your knowledge!
      </h3>

      <div className={styles.buttonContainer}>
        <PrimaryButton
          text="Survival Mode"
          onClick={() => navigate('/survival')}
          color={color.button.primaryColor}
        />
        <PrimaryButton
          text="Result Example"
          onClick={() => navigate('/result')}
          color={color.button.primaryColor}
        />
      </div>
    </div>
  );
};
