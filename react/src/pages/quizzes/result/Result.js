import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Result.module.css';
import { color, size } from '../../../theme';
import { PrimaryButton } from '../../../components/primaryButton/PrimaryButton';
import { submitScore } from '../../../api/leaderboard/submitScore';

export const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state;
  const questions = result.questions;
  const score = result.score;
  const type = result.type;
  const name = 'example2';
  const [resultMessage, setResultMessage] = useState('');

  const handleSubmitScore = async () => {
    const result = await submitScore(name, score, type);

    if (result.success) {
      alert('Score submitted!');
    } else {
      alert('Failed to submit score!');
    }
  };

  useEffect(() => {
    if (score <= 0) {
      setResultMessage('Grind hard!');
    } else if (score > 0 && score <= 5) {
      setResultMessage('Not bad, but you need some work!');
    } else if (score > 5 && score <= 10) {
      setResultMessage('You did good!');
    } else if (score > 10 && score <= 15) {
      setResultMessage('You did great!!');
    } else if (score > 15 && score <= 20) {
      setResultMessage('You are a master!');
    } else if (score > 20) {
      setResultMessage('You are a legend!');
    }
  }, [score]);

  return (
    <div
      className={styles.resultPage}
      style={{ background: color.background.primaryBackground }}
    >
      <div
        className={styles.resultHeader}
        style={{ background: color.background.secondaryBackground }}
      >
        <p
          className={styles.resultTitle}
          style={{
            fontSize: size.fonts.xxlarge,
            color: color.text.primaryBlack,
          }}
        >
          Score: {score}
        </p>
        <p
          className={styles.resultMessage}
          style={{
            fontsize: size.fonts.medium,
            color: color.text.primaryBlack,
          }}
        >
          {resultMessage}
        </p>
      </div>

      <div className={styles.buttonContainer}>
        <PrimaryButton text="Home" onClick={() => navigate('/')} />
        <PrimaryButton text="Play Again" onClick={() => navigate(`/${type}`)} />
        <PrimaryButton
          text="Submit Score"
          onClick={() => handleSubmitScore()}
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
