import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [selectedLength, setSelectedLength] = useState(null); // state for currently selected button

  useEffect(() => {
    // Fetch the JSON data from the public folder
    fetch(process.env.PUBLIC_URL + "/data.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>summaries over scale</h1>
      {jsonData && (
        // Add a link to the article
        <div>
          <a
            href={jsonData.articles[0].url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {jsonData.articles[0].title}
          </a>
        </div>
      )}
      {jsonData &&
        jsonData.articles[0].summaries.map((summary) => (
          // Return a button for each summary
          <button
            key={summary.length}
            onClick={() => setSelectedLength(summary.length)}
          >
            {summary.length}
          </button>
        ))}
      {/* Display the text of the selected summary */}
      {jsonData &&
        jsonData.articles[0].summaries
          .filter((summary) => summary.length === selectedLength)
          .map((summary) => (
            <div key={summary.length} className="text-container">
              {summary.text}
            </div>
          ))}
    </div>
  );
}

export default App;
