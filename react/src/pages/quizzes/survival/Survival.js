import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Survival.module.css';
import { QuizBox } from '../../../components/quizBox/QuizBox';
import { color, size } from '../../../theme';

export const Survival = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
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

      setCurrentQuestion({
        question: decodeHtml(data.results[0].question),
        answers: shuffled,
        correctAnswer: decodeHtml(data.results[0].correct_answer),
      });
      setQuestionNum((prev) => prev + 1);
    } catch (error) {
      console.log('Error with getQuestion: ', error);
    }
  };

  const handleClick = (answer, correctAnswer) => {
    if (clicked) return;
    setClicked(true);

    const updatedQuestions = [
      ...questions,
      { ...currentQuestion, selectedAnswer: answer },
    ];
    setQuestions(updatedQuestions);

    if (answer === correctAnswer) {
      setScore((prev) => prev + 1);
    } else {
      navigate('/result', {
        state: { score: score, questions: updatedQuestions, type: 'survival' },
      });
      return;
    }

    setTimeout(() => {
      getQuestion();
      setClicked(false);
    }, 1000);
  };

  const handleTimeUp = () => {
    const updatedQuestions = [
      ...questions,
      { ...currentQuestion, selectedAnswer: null },
    ];
    setQuestions(updatedQuestions);

    navigate('/result', {
      state: { score: score, questions: updatedQuestions, type: 'survival' },
    });
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
  }, [currentQuestion]);

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div
      className={styles.survivalPage}
      style={{ background: color.background.primaryBackground }}
    >
      {currentQuestion ? (
        <QuizBox
          question={currentQuestion}
          questionNum={questionNum}
          onClick={(answer) =>
            handleClick(answer, currentQuestion.correctAnswer)
          }
          clicked={clicked}
          score={score}
          time={time}
        />
      ) : (
        <p
          className={styles.loadingPage}
          style={{
            fontSize: size.fonts.xxlarge,
            color: color.text.primaryWhite,
          }}
        >
          Loading question...
        </p>
      )}
    </div>
  );
};
