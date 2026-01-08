import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    setError("");

    fetch(`https://www.omdbapi.com/?apikey=99eb9fd1&s=${name}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid movie name, Please try again");
        }
        return res.json();
      })
      .then((data) => {
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setData(data.Search);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <h1>Search Movie</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Search</button>

      {error && <h2>{error}</h2>}

      <div>
        {data.map((item) => (
          <div key={item.imdbID}>
            <h3>
              {item.Title} ({item.Year})
            </h3>
            <img src={item.Poster} alt={item.Title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
