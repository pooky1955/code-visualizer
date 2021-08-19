import { makeStyles } from "@material-ui/styles";
import { Bar } from "react-chartjs-2";
const useStyles = makeStyles({
  placeholder: {
    fontSize: "2rem",
    color: "#eceff4",
    textAlign: "center",
    marginTop: "1rem",
    fontFamily: "Roboto",
  },
  chartContainer : {
    height : "50vh",
    color : "white",
  },
  row: {
    color: "#eceff4",
    fontSize: "2rem",
    background: "#3b4252",
    padding: "0.5em 1em",
    borderRadius: "10px",
    marginBottom: "1.5rem",
  },
  container: {
    marginTop: "3rem",
  },
  variableBar: {
    backgroundColor: "#4c566a",
    padding: "0.2em 0.4em",
  },
  variableValue: {
    padding: "0.2em 0.4em",
  },
});

const JSONDisplayer = ({ variableValue }) => {
  let content;
  if (JSON.stringify(variableValue).length > 30){
    content = JSON.stringify(variableValue,null,2)
  } else {
    content = JSON.stringify(variableValue)
  }
  return <pre>{content}</pre>;
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "white",
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          fontColor: "white",
        },
      }, {
      }
    ],
  },
  maintainAspectRatio : false
};

const ArrayDisplayer = ({ variableValue: list }) => {
  const classes = useStyles()
  const data = {
    labels: list.map((_, index) => index),
    datasets: [
      {
        label: "Value",
        data: list,
        maxBarThickness : 70,
        barThickness : 80,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className={classes.chartContainer}>
      <Bar data={data} options={options} />
    </div>
  );
};
function allNums(arr) {
  return arr.reduce(function (result, val) {
    return result && typeof val === "number";
  }, true);
}
const ValueDisplayer = ({ variableValue }) => {
  if (Array.isArray(variableValue)) {
    if (allNums(variableValue))
      return <ArrayDisplayer variableValue={variableValue} />;
  } else {
    return <JSONDisplayer variableValue={variableValue} />;
  }
};

const RowDisplayer = ({ variableName, variableValue }) => {
  const classes = useStyles();
  return (
    <div className={classes.row}>
      <div className={classes.variableBar}>Name : {variableName}</div>
      <div className={classes.variableValue}>
        <ValueDisplayer variableValue={variableValue} />
      </div>
    </div>
  );
};
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
      ([variableName, variableValue], index) => {
        return (
          <RowDisplayer
            variableName={variableName}
            variableValue={variableValue}
            key={index}
          />
        );
      }
    );

    return <div className={classes.container}>{components}</div>;
  }
};
