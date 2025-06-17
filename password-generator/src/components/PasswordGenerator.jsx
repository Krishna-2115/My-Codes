import { useState, useEffect } from "react";
import "./PasswordGenerator.css";

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(15);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false,
    "exc-duplicate": false,
    spaces: false,
  });
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const updateStrength = () => {
    setStrength(
      length <= 8 ? "weak" : length <= 16 ? "medium" : "strong"
    );
  };

  const generatePassword = () => {
    let staticPassword = "";
    let randomPassword = "";
    let excludeDuplicate = options["exc-duplicate"];

    Object.entries(options).forEach(([key, value]) => {
      if (value) {
        if (key !== "exc-duplicate" && key !== "spaces") {
          staticPassword += characters[key] || "";
        } else if (key === "spaces") {
          staticPassword += `  ${staticPassword}  `;
        }
      }
    });

    for (let i = 0; i < length; i++) {
      const randomChar =
        staticPassword[Math.floor(Math.random() * staticPassword.length)];
      if (excludeDuplicate) {
        !randomPassword.includes(randomChar) || randomChar === " "
          ? (randomPassword += randomChar)
          : i--;
      } else {
        randomPassword += randomChar;
      }
    }

    setPassword(randomPassword);
    updateStrength();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    const icon = document.getElementById("copy-icon");
    icon.innerText = "check";
    icon.style.color = "#4285F4";
    setTimeout(() => {
      icon.innerText = "copy_all";
      icon.style.color = "#707070";
    }, 1500);
  };

  const toggleOption = (e) => {
    setOptions({ ...options, [e.target.id]: e.target.checked });
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line
  }, [length, options]);

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="wrapper">
        <div className="input-box">
          <input type="text" disabled value={password} />
          <span
            id="copy-icon"
            className="material-symbols-rounded"
            onClick={handleCopy}
          >
            copy_all
          </span>
        </div>
        <div className={`pass-indicator ${strength}`}></div>
        <div className="pass-length">
          <div className="details">
            <label className="title">Password Length</label>
            <span>{length}</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="pass-settings">
          <label className="title">Password Settings</label>
          <ul className="options">
            {Object.keys(options).map((key, i) => (
              <li className="option" key={key}>
                <input
                  type="checkbox"
                  id={key}
                  checked={options[key]}
                  onChange={toggleOption}
                  disabled={i === 0}
                  style={i === 0 ? { opacity: 0.7 } : {}}
                />
                <label htmlFor={key}>
                  {key === "lowercase"
                    ? "Lowercase (a-z)"
                    : key === "uppercase"
                    ? "Uppercase (A-Z)"
                    : key === "numbers"
                    ? "Numbers (0-9)"
                    : key === "symbols"
                    ? "Symbols (!-$^+)"
                    : key === "exc-duplicate"
                    ? "Exclude Duplicate"
                    : "Include Spaces"}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button className="generate-btn" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}
