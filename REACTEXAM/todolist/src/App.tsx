import React from "react";
import "./App.css";
import TodoList from "./Todolist";
import Clock from "./Timer";
import MyWeather from "./MyWeather";

function App() {
    let name = "React";

    return (
        <div className="Container">
            {/* <h1>Hello, {name === "React" ? "World!" : null}</h1>
            <p className="Button">ZUTOMAYO</p> */}
            <TodoList />
            <Clock />
            <MyWeather weather="비">일기예보</MyWeather>
        </div>
    );
}

export default App;
