import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [selectedSummaryIndex, setSelectedSummaryIndex] = useState(6);

  useEffect(() => {
    // Fetch the JSON data from the public folder
    fetch(process.env.PUBLIC_URL + "/data.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>summaries across lengths</h1>
        {jsonData && (
          // Add a link to the article
          <div className="info">
            <p>
              This is an prototype to illustrate summaries of a given article at
              a range of lengths written by AI. The article here is{" "}
              <a
                href={jsonData.articles[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {jsonData.articles[0].title}
              </a>{" "}
              which is one of my favorite longreads. I highly recommend it.{" "}
              <a target="_blank" href="https://whichlight.com/">
                ~whichlight
              </a>
            </p>
            <p>
              Move the slider to increase the length of the article from two
              words until the full article:
            </p>
          </div>
        )}
      </div>

      <div className="controls">
        {/* Display the slider */}
        {jsonData && (
          <input
            className="slider"
            type="range"
            min={0}
            max={jsonData.articles[0].summaries.length - 1}
            step={1}
            value={selectedSummaryIndex}
            onChange={(e) => setSelectedSummaryIndex(e.target.value)}
          />
        )}
        {/* Display wordcount */}
        {jsonData && (
          <div className="wordcount">
            Words:{" "}
            {
              jsonData.articles[0].summaries[selectedSummaryIndex].text
                .replace(/\r\n/g, "<br />")
                .split(" ").length
            }
          </div>
        )}
      </div>

      {/* Display the text of the selected summary */}

      {jsonData && (
        <div className="text-container">
          <div
            dangerouslySetInnerHTML={{
              __html: jsonData.articles[0].summaries[
                selectedSummaryIndex
              ].text.replace(/\r\n/g, "<br />"),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
