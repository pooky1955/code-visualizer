import { makeStyles, mergeClasses } from "@material-ui/styles";

const useStyles = makeStyles({
  placeholder: {
    fontSize: "2rem",
    color: "#eceff4",
    textAlign: "center",
    marginTop: "1rem",
    fontFamily: "Roboto",
  },
  row : {
    color: "#eceff4",
    fontSize : "2rem",
    background : "#3b4252",
    padding : "0.5em 1em",
    borderRadius : "10px",

  },
  container : {
      marginTop : "3rem",
  },
  variableBar : {
      backgroundColor : '#4c566a',
      padding : "0.2em 0.4em"
  },
  variableValue : {
      padding : "0.2em 0.4em"
  }
});
export const ContentDisplayer = ({ content }) => {
  const classes = useStyles();
  if (content === null) {
    return (
      <div className={classes.placeholder}>
        Come on, start running some code!
      </div>
    );
  } else {
    const components = Object.entries(content).map(
      ([variableName, variableValue],index) => {
        return (
          <div className={classes.row} key={index}>
            <div className={classes.variableBar}>Name : {variableName}</div>
            <div className={classes.variableValue}><pre>{JSON.stringify(variableValue)}</pre></div>
          </div>
        );
      }
    );

    return <div className={classes.container}>
        {components}
    </div>
  }
};
