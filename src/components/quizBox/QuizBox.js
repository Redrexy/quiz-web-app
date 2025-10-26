import styles from './QuizBox.module.css';
import { color, size } from '../../theme';

export const QuizBox = ({
  question,
  questionNum,
  onClick,
  clicked,
  score,
  time,
}) => {
  return (
    <div className={styles.quizBox}>
      <div className={styles.quizDetails}>
        <span
          style={{
            fontSize: size.fonts.medium,
            color: color.text.primaryBlack,
          }}
        >
          Question: {questionNum}
        </span>
        <span
          style={{
            fontSize: size.fonts.medium,
            color: color.text.primaryBlack,
          }}
        >
          Time: {time}s
        </span>
        <span
          style={{
            fontSize: size.fonts.medium,
            color: color.text.primaryBlack,
          }}
        >
          Score: {score}
        </span>
      </div>

      <div className={styles.quizQuestion}>
        <p
          style={{
            fontSize: size.fonts.medium,
            color: color.text.primaryBlack,
          }}
          className={styles.quizQuestionText}
        >
          {question.question}
        </p>
      </div>

      <div className={styles.shuffledAnswers}>
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className={styles.shuffledAnswersButton}
            style={{
              fontSize: size.fonts.medium,
              color: color.text.primaryBlack,
            }}
            onClick={() => onClick(answer)}
            disabled={clicked}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};
