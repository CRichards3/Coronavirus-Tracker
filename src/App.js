import React from "react";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import Footer from "./components/Footer/Footer";
import MiddleSection from "./components/MiddleSection/MiddleSection";

import { fetchData } from "./api";
import coronaImg from "./images/covid19.png";

import styles from "./App.module.css";

class App extends React.Component {
  state = {
    data: {},
    country: ""
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async country => {
    //fetch data, then set state
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
    console.log(this.state.country);
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} alt="Covid19" src={coronaImg} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <MiddleSection data={data} />
        <Chart data={data} country={country} />
        <Footer />
      </div>
    );
  }
}

export default App;
