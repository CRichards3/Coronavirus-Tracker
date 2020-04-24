import React from "react";
import Cards from "../Cards/Cards";
import Doughnut from "../Doughnut/Doughnut";
import { IconButton } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import styles from "./MiddleSection.module.css";

const MiddleSection = ({ data }) => {
  const [doughnutVisible, setDoughnutVisible] = React.useState(false);
  const onToggle = () => setDoughnutVisible(!doughnutVisible);

  return (
    <div className={styles.container}>
      {doughnutVisible ? <Doughnut data={data} /> : <Cards data={data} />}
      <IconButton>
        <NavigateNextIcon
          variant="contained"
          color="secondary"
          fontSize="large"
          onClick={onToggle}
        />
      </IconButton>
    </div>
  );
};

export default MiddleSection;
