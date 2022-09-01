import React, { useEffect, useState } from "react";
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import Select from '@mui/material/Select';
import InfoBox from './InfoBox';
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

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
        ))
        setCountries(countries)
      })
    } 
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <div className="app__dropdown">
          <label for="cars">Choose Country :</label>

            <select onChange={onCountryChange} value={country}>
              <option value="country">worldwide</option>
              {countries.map(country => (
                <option value={country.value}>{country.name}</option>
              ))}
            </select>
        </div>
       
        
      </div>
      <div className="app-stats">
        <InfoBox title="Coronavirus Cases"cases={123} total={2000}/>

        <InfoBox title="Recovered" cases={4000} total={3000}/>

        <InfoBox title="Deaths" cases={500} total={500}/>
      </div>
    </div>
  );
}

export default App;
