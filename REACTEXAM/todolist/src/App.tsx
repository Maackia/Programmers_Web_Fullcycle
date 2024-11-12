import React from "react";
import "./App.css";

function App() {
    let name = "React";

    const style = {
        backgroundColor: "red",
        color: "white",
        fontSize: "24px",
        padding: "10px",
        borderRadius: "5px",
        textAlign: "center" as const,
    };

    return (
        <div className="App-header">
            <h1>Hello, {name === "React" ? "World!" : null}</h1>
            <p style={style}>ZUTOMAYO</p>
        </div>
    );

    // const port = undefined;

    // return <div>{port || "Port is not defined"}</div>;
}

// function App() {
//     return React.createElement("div", null, "Hello, React", React.createElement("p", null, "This is a paragraph."));
// }

export default App;
