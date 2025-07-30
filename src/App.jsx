import { useState } from "react";

import "./App.css";
import { useFetchBooks } from "./hooks/useFetchBooks";

function App() {
  const [firstInputValue, setFirstInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  const { books, isLoading } = useFetchBooks(firstInputValue);

  const handleFirstInputChange = (event) => {
    setFirstInputValue(event.target.value);
  };

  const handleSecondInputChange = (event) => {
    setSecondInputValue(event.target.value);
  };

  return (
    <div className="box">
      <div className="box__form-field">
        <label htmlFor="fist-input">First Input:</label>
        <input
          className="box__form-field--input"
          type="text"
          id="fist-input"
          onChange={handleFirstInputChange}
          value={firstInputValue}
        />
      </div>

      {isLoading ? (
        <span>Loading ...</span>
      ) : (
        !selectedBook && (
          <div className="box__books">
            <ul>
              {books.map(({ title }, index) => {
                return (
                  <li
                    className="box__books--item "
                    key={`${title}${index}`}
                    onClick={() => {
                      setSelectedBook(title);
                    }}
                  >
                    {title}
                  </li>
                );
              })}
            </ul>
          </div>
        )
      )}

      {selectedBook && (
        <div className="box__selected-item">
          <span
            className="box__selected-item--item"
            onClick={() => {
              setSecondInputValue(selectedBook);
            }}
          >
            {selectedBook}
          </span>
          <button
            className="box__selected-item--button"
            onClick={() => {
              setSelectedBook("");
            }}
          >
            X
          </button>
        </div>
      )}

      <div className="box__form-field">
        <label htmlFor="fist-input">First Input:</label>
        <input
          className="box__form-field--input"
          type="text"
          id="fist-input"
          onChange={handleSecondInputChange}
          value={secondInputValue}
        />
      </div>
    </div>
  );
}

export default App;
