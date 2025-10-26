import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Result.module.css';
import { color, size } from '../../../theme';
import { PrimaryButton } from '../../../components/primaryButton/PrimaryButton';

export const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state;
  const questions = result.questions;
  const score = result.score;
  const page = result.page;
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    if (score <= 0) {
      setResultMessage('You need a lot of work!');
    } else if (score < 5) {
      setResultMessage('Not bad, but you need some work!');
    } else if (score < 10) {
      setResultMessage('You did good!');
    } else if (score < 15) {
      setResultMessage('You did great!!');
    } else if (score < 20) {
      setResultMessage('You are a master!');
    } else if (score >= 20) {
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
      </div>

      <div className={styles.buttonContainer}>
        <PrimaryButton
          text="Home"
          onClick={() => navigate('/')}
          color={color.button.home}
        />
        <PrimaryButton
          text="Play Again"
          onClick={() => navigate(`/${page}`)}
          color={color.button.playAgain}
        />
        <PrimaryButton
          text="Submit Score"
          onClick={null}
          color={color.button.submitScore}
        />
      </div>

      <div className={styles.resultContainer}>
        {questions.map((question, index) => (
          <div key={index} className={styles.resultDetails}>
            <p
              className={styles.resultDetailsText}
              style={{
                color: color.text.primaryBlack,
                fontsize: size.fonts.medium,
              }}
            >
              {question.question}
            </p>
            <p
              className={styles.resultDetailsText}
              style={{
                color:
                  question.selectedAnswer === question.correctAnswer
                    ? 'green'
                    : 'red',
                fontsize: size.fonts.medium,
              }}
            >
              {question.selectedAnswer ?? 'Not answered'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
