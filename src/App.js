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

  return (
    <div className="App">
      <div className="levelSelector">
        <h1>Word Association</h1>
        <select
          name="levels"
          id="levels"
          value={chosenLevel}
          onChange={e => setChosenLevel(e.target.value)}
        >
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </select>
      </div>
    </div>
  );
};

export default App;
