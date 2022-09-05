import React, { useEffect, useState } from "react";
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import Select from '@mui/material/Select';
import InfoBox from './InfoBox';
import Map from './Map';
import "./App.css";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] =  useState([]);

  // fetches when the browser loads
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

  useEffect(() => {
    //code in here will run once
    //when the component loads and not again after
    //using async to send request, wait for it
    //then do something with it
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,//united states
            value: country.countryInfo.iso2, // us
          }
        ));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      })
    } 
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`
    // backticks - for javascript concatenation with string
    // https://disease.sh/v3/covid-19/all   worldwide
    // https://disease.sh/v3/covid-19/countries{countries}
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    }) 

  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <div className="app__dropdown">
            <label for="cars">Choose Country :</label>

              <select onChange={onCountryChange} value={country}>
                <option value="worldwide">worldwide</option>
                {countries.map(country => (
                  <option value={country.value}>{country.name}</option>
                ))}
              </select>
          </div>
                
                
        </div>


        <div className="app-stats">
          <InfoBox title="Coronavirus Cases"cases={countryInfo.todayCases} total={countryInfo.cases}/>

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        <div>
          <Map/>
        </div>
      </div>
      <div className="app__right">
        <div className="card">
          <div className="container">
            <h3>Live cases by country</h3>
            <Table countries={tableData}/>
            <h3>Worldwide new cases</h3>
            <LineGraph  />
          </div>
         
        </div>
        
      </div>

      
    </div>
  );
}

export default App;
