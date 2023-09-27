import React, { useState } from "react";
import "./App.css";
import ImageDetailPage from "./ImageDetailPage";
import MapToolPage from "./MapToolPage";

function App() {
  const [files, setFiles] = useState([]);
  const [inputText, setInputText] = useState("");
  const [enteredWords, setEnteredWords] = useState([]);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [showMapToolPage, setShowMapToolPage] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Track selected image index
  const [editedWords, setEditedWords] = useState([...enteredWords]);

  function handleImageChange(event) {
    const selectedFiles = event.target.files;
    const urls = [];
    for (const file of selectedFiles) {
      urls.push(URL.createObjectURL(file));
    }
    setFiles(urls);
  }

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  function handleDoneClick() {
    console.log("Uploaded Images:", files);
    console.log("Input Text:", inputText);

    const wordsArray = inputText.split(",").map((word) => word.trim());
    setEnteredWords(wordsArray);
  }

  function handleProceedClick() {
    setShowDetailPage(true);
  }

  function handleShowMapToolClick(index) {
    setSelectedImageIndex(index);
    setShowMapToolPage(true);
  }

  function handleSaveClick() {
    setEnteredWords(editedWords);
    setShowMapToolPage(false);
  }

  function handleBackClick() {
    setEditedWords([...enteredWords]);
    setShowMapToolPage(false);
  }


  return (
    <div className="App">
      {showDetailPage ? (
        <ImageDetailPage
          images={files}
          enteredWords={enteredWords}
          onShowMapToolClick={handleShowMapToolClick}
          setSelectedImageIndex={setSelectedImageIndex}
        />
      ) : (
        <div>
          <h2>Upload Images:</h2>
          <input type="file" multiple onChange={handleImageChange} />
          <div className="image-container">
            {files.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  width: "auto",
                  height: "auto",
                }}
                onClick={() => setSelectedImageIndex(index)} // Set selected image index
              />
            ))}
          </div>

          <h2>Enter Text:</h2>
          <input type="text" value={inputText} onChange={handleInputChange} />
          <button onClick={handleDoneClick}>Done</button>
          {enteredWords.length > 0 && (
            <div>
              <h2>Entered Words:</h2>
              <div className="word-container">
                {enteredWords.map((word, index) => (
                  <div key={index} className="word-box">
                    {word}
                  </div>
                ))}
              </div>
            </div>
          )}
          <button onClick={handleProceedClick}>Proceed</button>
        </div>
      )}

      {showMapToolPage && selectedImageIndex !== null && (
        <MapToolPage
          selectedImage={files[selectedImageIndex]}
          enteredWords={enteredWords}
          onSaveClick={handleSaveClick}
          onBackClick={handleBackClick}
        />
      )}
    </div>
  );
}

export default App;