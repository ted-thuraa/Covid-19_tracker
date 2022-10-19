import React, { useEffect, useState } from "react";
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import Select from '@mui/material/Select';
import InfoBox from './InfoBox';
import Map from './Map';
import "./App.css";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] =  useState([]);
  const [mapContries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCentre, setMapCentre] = useState([51.505, -0.09]); //{ lat: 34.80746, lng: -40.4796 }
  const [mapZoom, setMapZoom] = useState(3);

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
        setMapCountries(data);
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
      setMapCentre([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    }); 

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
          <InfoBox 
            onClick={(e) => setCasesType('cases')}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)}
          />

          <InfoBox 
            onClick={(e) => setCasesType('recovered')} 
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)}/>

          <InfoBox 
            onClick={(e) => setCasesType('deaths')}
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)}/>
        </div>

        <div>
          <Map
          countries={mapContries}
          casesType={casesType}
          center={mapCentre}
          zoom={mapZoom}/>
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
