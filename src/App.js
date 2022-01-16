import axios from "axios";
import { useEffect, useState } from "react";

import levels from "./components/Levels";

const App = () => {
  const [chosenLevel, setChosenLevel] = useState(null);
  const [words, setWords] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);

  const getRandomWords = () => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/results",
      params: { level: chosenLevel, area: "sat" },
    };

    axios
      .request(options)
      .then(response => {
        console.log(response.data);
        setWords(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  console.log(words && words.quizlist);

  useEffect(() => {
    if (chosenLevel) getRandomWords();
  }, [chosenLevel]);

  const checkAnswer = (option, optionIndex, correctAnswer) => {
    console.log(optionIndex, correctAnswer);
    if (optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, option]);
      setScore(score => score + 1);
    } else {
      setScore(score - 1);
    }

    setClicked([...clicked, option]);
  };

  console.log("correctAnswers", correctAnswers);
  console.log("clicked", clicked);

  return (
    <div className="app">
      {!chosenLevel && (
        <div className="levelSelector">
          <h1>Word Association</h1>
          <p>Select your level to start</p>
          <select
            name="levels"
            id="levels"
            value={chosenLevel}
            onChange={e => setChosenLevel(e.target.value)}
          >
            {levels.map((option, _index) => (
              <option key={_index} value={option.value}>
                {option.select}
              </option>
            ))}
          </select>
        </div>
      )}

      {chosenLevel && words && (
        <div className="questionArea">
          <h1>Welcome to level {chosenLevel}</h1>
          <h3>Your Score is: {score}</h3>
          <div className="questions">
            {words.quizlist.map((question, _questionIndex) => (
              <div className="questionBox" key={_questionIndex}>
                {question.quiz.map((tip, _index) => (
                  <p key={_index}>{tip}</p>
                ))}
                <div className="questionButtons">
                  {question.option.map((option, optionIndex) => (
                    <div className="questionButton" key={optionIndex}>
                      <button
                        disabled={clicked.includes(option)}
                        onClick={() =>
                          checkAnswer(option, optionIndex + 1, question.correct)
                        }
                      >
                        {option}
                      </button>
                      {correctAnswers.includes(option) && <p>Correct!</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setChosenLevel(null)}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default App;
