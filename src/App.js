import axios from "axios";
import { useState } from "react";

const App = () => {
  const [chosenLevel, setChosenLevel] = useState(null);

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
      })
      .catch(error => {
        console.error(error);
      });
  };

  console.log(chosenLevel);

  const options = [
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

      {chosenLevel && (
        <div className="questionArea">
          <h1>Welcome to level {chosenLevel}</h1>
        </div>
      )}
    </div>
  );
};

export default App;
