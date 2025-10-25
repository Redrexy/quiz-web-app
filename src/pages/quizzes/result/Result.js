import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Result.module.css';
import { color, size } from '../../../theme';
import { PrimaryButton } from '../../../components/primaryButton/PrimaryButton';

export const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state;
  const score = result.score;
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    if (score <= 0) {
      setResultMessage('You need a lot of work!');
    } else if (score <= 5) {
      setResultMessage('Not bad, but you need some work!');
    } else if (score <= 10) {
      setResultMessage('You did good!');
    } else if (score <= 15) {
      setResultMessage('You did great!!');
    } else if (score <= 20) {
      setResultMessage('You are a master!');
    } else if (score > 21) {
      setResultMessage('You are a legend!');
    }
  }, [score]);

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultHeader}>
        <div
          className={styles.resultTitle}
          style={{ fontSize: size.fonts.xxlarge }}
        >
          Score: {score}
        </div>
        <p
          className={styles.resultMessage}
          style={{ fontsize: size.fonts.medium }}
        >
          {resultMessage}
        </p>
        <div className={styles.buttonContainer}>
          <PrimaryButton
            text="Home"
            onClick={() => navigate('/')}
            color={color.button.home}
          />
          <PrimaryButton
            text="Play Again"
            onClick={() => navigate('/survival')}
            color={color.button.playAgain}
          />
          <PrimaryButton
            text="Submit Score"
            onClick={() => navigate('/')}
            color={color.button.submitScore}
          />
        </div>
      </div>
    </div>
  );
};
