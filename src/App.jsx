import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const traffic = {
    red: {
      time: 10,
      next: "yellow",
    },
    yellow: {
      time: 5,
      next: "green",
    },
    green: {
      time: 15,
      next: "red",
    },
  };
  const [isActive, SetIsActive] = useState("red");
  const [timePassed, SetTimePassed] = useState(0);
  const [delay, SetDelay] = useState(0);

  useEffect(() => {
    const times = setInterval(() => {
      SetTimePassed((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(times);
    };
  }, [isActive]);

  useEffect(() => {
    let totalTime = traffic[isActive].time + delay;
    if (timePassed > totalTime) {
      SetTimePassed(0);
      SetDelay(0);
      SetIsActive(traffic[isActive].next);
    }
  }, [timePassed, isActive]);

  const handleChange = (e, time) => {
    if (e.key === "Enter") {
      const enteredDelay = parseInt(e.target.value, 10);
      if (!isNaN(enteredDelay)) {
        SetDelay(enteredDelay);
      }
    }
  };

  const handleClick = (value) => {
    return () => {
      SetIsActive(value);
      SetTimePassed(0);
    };
  };
  return (
    <div className="container">
      <h1>Traffic Light System</h1>
      <div>
        <span>Red Light : 10 sec</span>
        <span>Yellow Light : 5 sec</span>
        <span>Green Light : 15 sec</span>
      </div>
      <p>Timer : {`${timePassed}`}</p>
      <div>
        <label htmlFor="delay">Delay : </label>
        <input
          id="delay"
          type="text"
          onKeyUp={(e) => handleChange(e, e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleClick("red")}>Red</button>
        <button onClick={handleClick("yellow")}>Yellow</button>
        <button onClick={handleClick("green")}>Green</button>
      </div>
      <div
        style={{
          border: "10px solid black",
          borderRadius: "10px",
          backgroundColor: "black",
          width: "120px",
          margin: "auto",
        }}
      >
        <div
          style={{
            height: "100px",
            width: "100px",
            border: "1px solid red",
            borderRadius: "50%",
            backgroundColor: "red",
            opacity: isActive == "red" ? 1 : 0.4,
            margin: "10px",
          }}
        ></div>
        <div
          style={{
            height: "100px",
            width: "100px",
            border: "1px solid yellow",
            borderRadius: "50%",
            backgroundColor: "yellow",
            opacity: isActive == "yellow" ? 1 : 0.4,
            margin: "10px",
          }}
        ></div>
        <div
          style={{
            height: "100px",
            width: "100px",
            border: "1px solid green",
            borderRadius: "50%",
            backgroundColor: "green",
            opacity: isActive == "green" ? 1 : 0.3,
            margin: "10px",
          }}
        ></div>
      </div>
      <div
        style={{ height: "450px", width: "10px", backgroundColor: "black" }}
      ></div>
    </div>
  );
}

export default App;
