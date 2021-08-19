import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { ContentDisplayer } from "./ContentDisplayer";
const useStyles = makeStyles({
  container: {},
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90vw",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    background: "#a3be8c",
    padding: "0.5em 1em",
    fontSize: "1rem",
    border: "1px solid #a3be8c",
  },
  stepIndicator: {
    fontSize: "1.3rem",
    color: "#eceff4",
  },
});
export const Visualizer = ({ allSteps }) => {
  const classes = useStyles();
  const totalSteps = allSteps.length || 0;
  const [index, setIndex] = useState(1);
  useEffect(() => {
    setIndex(Math.min(index+1,totalSteps))
  }, [totalSteps])
  const handleNext = () => {
    setIndex(Math.min(index + 1, totalSteps));
  };
  const handlePrev = () => {
    setIndex(Math.max(index - 1, 1));
  };
  console.log(allSteps[index]);
  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <button onClick={handlePrev} className={classes.button}>
          Previous
        </button>
        {totalSteps == 0 ? (
          <div></div>
        ) : (
          <div className={classes.stepIndicator}>
            Step {index} of {totalSteps}
          </div>
        )}
        <button onClick={handleNext} className={classes.button}>
          Next
        </button>
      </div>
      <div className={classes.content}>
        <ContentDisplayer content={allSteps[index - 1] || null} />
      </div>
    </div>
  );
};

export default Visualizer;
