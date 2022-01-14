import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [chosenLevel, setChosenLevel] = useState("2");
  const [words, setWords] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const getRandomWords = () => {
    const options = {
      method: "GET",
      url: "https://twinword-word-association-quiz.p.rapidapi.com/type1/",
      params: { level: chosenLevel, area: "sat" },
      headers: {
        "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
        "x-rapidapi-key": "4f44b2b4famsh9851d3135c14023p1d68aajsn8515efd61176",
      },
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
    if (optionIndex == correctAnswer) {
      setCorrectAnswers([...correctAnswers, option]);
    }
  };
  console.log(correctAnswers);

  const options = [
    {
      select: "Select a level",
      value: null,
    },
    {
      select: "level 1",
      value: 1,
    },
    {
      select: "level 2",
      value: 2,
    },
    {
      select: "level 3",
      value: 3,
    },
  ];

  return (
    <div className="App">
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
            {options.map((option, _index) => (
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
          {words.quizlist.map((question, questionIndex) => (
            <div className="questionBox" key={questionIndex}>
              {question.quiz.map((tip, _index) => (
                <p key={_index}>{tip}</p>
              ))}
              <div className="questionButtons">
                {question.option.map((option, optionIndex) => (
                  <div className="questionButton" key={optionIndex}>
                    <button
                      onClick={() =>
                        checkAnswer(option, optionIndex + 1, question.correct)
                      }
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
              <p>{question.correct}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
