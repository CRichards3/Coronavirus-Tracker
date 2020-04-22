import React from "react";
import { Typography } from "@material-ui/core";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.main}>
      <Typography variant="body2" color="primary">
        Link to COVID-19 data source: https://github.com/mathdroid/covid-19-api
      </Typography>
    </div>
  );
};

export default Footer;
