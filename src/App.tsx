import { words } from './eng'
import './App.css'
import shuffle from 'lodash/shuffle';
import { useState } from 'react';

function App() {
  const [started, setStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [questionOrder, setQuestionOrder] = useState([]);

  // クイズスタート
  const QuizStart = () => {
    setStarted(true);
    setScore(0);
    setQuestionCount(0)

    const order = shuffle(words).slice(0,5);
    setQuestionOrder(order);
    buildQuestion(order[0]);
  };

  const buildQuestion = (pick) => {
    setCurrentWord(pick);
    const wrongPool = words.filter(w=>w.word !== pick.word);
    const wrongs = shuffle(wrongPool).slice(0,2);
    setOptions([pick.meaning, wrongs[0].meaning, wrongs[1].meaning]);
  }

  const handleChoose = (choose) => {
    // 正解
    if(choose === currentWord.meaning) {
      setMessage('正解！');
      setQuestionCount(questionCount + 1);

      //  初回で正解の場合
      if(!alreadyAnswered) {
        setScore(score + 1);
        setAlreadyAnswered(true);
      }
    // 不正解
    } else {
      setMessage('不正解！');
      setAlreadyAnswered(true);
    }
  };

  const goNextQuestion = () => {
    if(questionCount >= 5) return;
    const next = questionOrder[questionCount];
    buildQuestion(next);
    setAlreadyAnswered(false);
  }

  if (started && questionCount >= 5) {
    return (
      <div className="quiz-container quiz-end">
        <p>クイズ終了</p>
        <p className="final-score">あなたのスコアは{score}点です。</p>
        <button className="start-button" onClick={QuizStart}>もう一度</button>
      </div>
    );

  }

  return (
    <div className="quiz-container">
      {!started ? (
        <button className="start-button" onClick={QuizStart}>スタート</button>

      ) : (
        <div>
          <h2>次の単語の意味は？</h2>
          {currentWord && (
            <>
              <p className="word-display">{currentWord.word}</p>
              <div className="options">
                {options.map((opt, i) => (
                  <button key={i} className="option-button" onClick={() => handleChoose(opt)}>{opt}</button>
                ))}
              </div>
            </>
          )}
          {message === "正解！" && (
            <>
              <p className="correct-message">⭕ 正解！</p>
              <button className="next-button" onClick={goNextQuestion}>次の問題へ</button>
            </>
          )}

          {message === "不正解！" && (
            <p>もう一度チャレンジしてね。</p>
          )}

        </div>
      )}
    </div>
  )
}

export default App
