import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/primaryButton/PrimaryButton';
import styles from './Home.module.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <div className={styles.homeContainer}>
        <h1 className={styles.homeTitle}>React Quiz Application</h1>
        <h3 className={styles.homeDetails}>
          Take this test to test your knowledge!
        </h3>

        <div className={styles.buttonContainer}>
          <PrimaryButton
            text="Survival Mode"
            onClick={() => navigate('/survival')}
          />
          <PrimaryButton
            text="1 Minute Mode"
            onClick={() => navigate('/minute')}
          />
          <PrimaryButton
            text="Leaderboard"
            onClick={() => navigate('/leaderboard')}
          />
          <PrimaryButton text="Example" onClick={null} />
        </div>
      </div>
    </div>
  );
};
