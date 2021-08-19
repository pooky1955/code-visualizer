import React, { useState, useRef } from "react";
import "./App.css";
import { Visualizer } from "./sketch.js";
import { Controlled as CodeMirror } from "react-codemirror2";
import { makeStyles } from "@material-ui/styles";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
const useStyles = makeStyles({
  editor: {
    fontSize: "2rem",
    borderRadius: "2px",
    marginTop: "2rem",
    width: "90vw",
    border: "1px solid #eceff4",
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      marginBottom: "2rem",
    },
  },
  header: {
    fontSize: "4rem",
    color: "#eceff4",
    fontFamily: "monospace",
  },
  button: {
    background: "#a3be8c",
    padding: "1em 2em",
    fontSize: "2rem",
    border: "1px solid #a3be8c",
  },
  content: {
    fontFamily: "monospace",
    color: "#eceff4",
    fontSize: "1.5rem",
    width: "90vw",
    margin: "auto",
  },
});

const placeholderText = `let myList = []
for (let i =0 ;i < 10; i++){
  myList[i] = i
  visualize({"Cool List" : myList, "Beautiful Index" : i})
}
//Thanks for using this!`
function App() {
  const [value, setValue] = useState(placeholderText);
  const classes = useStyles();
  const [runned,setRunned] = useState(0)
  const stackEffects = useRef([]);
  const serialize = (valueDict) => {
    const newObject = {}
    for (const [key, value] of Object.entries(valueDict)){
      newObject[key] = JSON.parse(JSON.stringify(value))
    }
    return newObject
  }
  const visualize = (value) => {
    const serialized = serialize(value)
    stackEffects.current.push(serialized);
  };
  const options = {
    mode: "javascript",
    lineNumbers: true,
    theme: "nord",
  };
  const handleRun = () => {
    stackEffects.current = [];
    try {
      const runnable = new Function("visualize", value);
      runnable(visualize);
      setRunned(runned + 1)
    } catch (e) {
      alert(`Your code had an error : ${e}`);
    }
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.header}> CODE VISUALIZER </h1>
      <div className={classes.content}>
        {`
        To visualize anything, simply use the visualize method() and pass in the object.
        The only supported language for now is Javascript.
        For example, if you wanted to show a list myList, and a variable myVar,
        you would write visualize({index : i,list : myList})
        `}
      </div>
      <CodeMirror
        options={options}
        value={value}
        className={classes.editor}
        onBeforeChange={(editor, data, value) => {
          setValue(value);
        }}
        onChange={(editor, data, value) => {}}
      />
      <button onClick={handleRun} className={classes.button}>
        Run Code
      </button>
      <h2 className={classes.header}> VISUALIZED OUTPUT </h2>
      <Visualizer allSteps={stackEffects.current} runned={runned}></Visualizer>
    </div>
  );
}

export default App;
