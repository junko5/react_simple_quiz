import {words} from './eng'
import './App.css'
import shuffle from 'lodash/shuffle';
import {  useState } from 'react';

function App() {
  const [started, setStarted] =useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  const QuizStart = () => {
    setStarted(true);
    setScore(0);
    setQuestionCount(0)
    makeQuestion();

  };

  const handleChoose = (choose) => {
    if (choose === currentWord.meaning) {
      setMessage('正解！');
      setScore(score + 1);
      setQuestionCount(questionCount + 1);
    } else {
      setMessage('不正解！');
    }
  };

  const makeQuestion = () => {
    if(questionCount >= 5) return;

    // words配列の中から、ランダムに１個とりだし、pickに代入する
    const pick = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(pick);

    // 不正解候補を作る
    const wrongPool = words.filter(word => word.word !== pick.word);

    // その中から２つ選ぶ
    const wrongs = shuffle(wrongPool).slice(0, 2);

    // 正解と不正解をまぜて三択に
    const opts = shuffle([pick.meaning, wrongs[0].meaning, wrongs[1].meaning]);
    setOptions(opts);

    setMessage(''); // メッセージをリセット\

  };

  if(started && questionCount >= 5) {
    return(
      <div>
        <p>クイズ終了</p>
        <p>あなたのスコアは{score}点です。</p>
        <button onClick={QuizStart}>もう一度</button>
      </div>
    );
  
  }

  return (
    <>
    {!started ? (
      <button onClick={QuizStart}>スタート</button>

    ): (
      <div>
        <h2>次の単語の意味は？</h2>
        {currentWord && (
          <>
            <p>{currentWord.word}</p>
            <div>
              {options.map((opt, i) => (
                <button key={i} onClick={()=>handleChoose(opt)}>{opt}</button>
              ))}
            </div>
          </>
        )}
              <p style={{ marginTop:20}}>{message}</p>
              {message=="正解！" ? (
                <button onClick={makeQuestion}>次の問題へ</button>
              ): <p>もう一度チャレンジしてね。</p>}
      </div>
    )}
    </>
  )
}

export default App
