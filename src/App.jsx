import { useState, useEffect, useCallback, useRef } from "react";
function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef();
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqorstuvwxyzABCDEFGHIJKLMNOPQORSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "/?@#()%^&!";
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length) + 0;
      pass += str[index];
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipBoard = useCallback(() => {
    passRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [length, numberAllowed, charAllowed, password]);

  useEffect(() => passwordGenerator(), [length, numberAllowed, charAllowed]);

  return (
    <>
      <div className="w-full max-w-xl mx-auto bg-slate-300 p-2 mt-5 rounded-md">
        <h1 className="mx-auto">Password Generator</h1>
        <div className="flex justify-between">
          <input
            className="w-full outline-none overflow-hidden rounded-md"
            type="text"
            value={password}
            readOnly
            placeholder="password"
            ref={passRef}
          ></input>
          <button
            className="bg-cyan-400 rounded-md ml-2 p-1"
            onClick={copyToClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex justify-between mt-2">
          <div>
            <input
              className=""
              type="range"
              min={1}
              max={100}
              value={length}
              onChange={(event) => setLength(event.target.value)}
            ></input>
            <label>Length({length})</label>
          </div>
          <div>
            <input
              className=""
              type="checkbox"
              onChange={() => setNumberAllowed((prevState) => !prevState)}
            ></input>
            <label>Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={() => setCharAllowed((prevState) => !prevState)}
            ></input>
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
