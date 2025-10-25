import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Survival.module.css';
import { QuizBox } from '../../../components/quizBox/QuizBox';

export const Survival = () => {
  const [question, setQuestion] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [questionNum, setQuestionNum] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const getQuestion = async () => {
    try {
      let difficulty = 'easy';
      if (questionNum < 10) {
        difficulty = 'easy';
      } else if (questionNum < 20) {
        difficulty = 'medium';
      } else {
        difficulty = 'hard';
      }

      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple`
      );
      if (!response.ok) {
        console.error('HTTP error:', response.status);
        return;
      }

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        console.error('No results from API:', data);
        return;
      }

      const shuffled = [
        ...data.results[0].incorrect_answers,
        data.results[0].correct_answer,
      ].sort(() => Math.random() - 0.5);

      setQuestion(decodeHtml(data.results[0].question));
      setShuffledAnswers(shuffled);
      setCorrectAnswer(decodeHtml(data.results[0].correct_answer));
      setQuestionNum((prev) => prev + 1);
    } catch (error) {
      console.log('Error with getQuestion: ', error);
    }
  };

  const handleClick = (answer, correctAnswer) => {
    if (clicked) return;
    setClicked(true);

    if (answer === correctAnswer) {
      setScore((prev) => prev + 1);
    } else {
      navigate('/result', { state: { score: score } });
    }

    setTimeout(() => {
      getQuestion();
      setClicked(false);
    }, 1000);
  };

  const handleTimeUp = () => {
    navigate('/result', { state: { score: score } });
    // setTimeout(() => {
    //   getQuestion();
    //   setClicked(false);
    // }, 1000);
  };

  useEffect(() => {
    if (time <= 0) {
      handleTimeUp();
      return;
    }

    const timerId = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [time]);

  useEffect(() => {
    setTime(10);
  }, [question]);

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div className={styles.survivalPage}>
      {question ? (
        <QuizBox
          question={question}
          questionNum={questionNum}
          shuffledAnswers={shuffledAnswers}
          onClick={(answer) => handleClick(answer, correctAnswer)}
          clicked={clicked}
          score={score}
          time={time}
        />
      ) : null}
    </div>
  );
};
