import { useEffect, useState } from "react";
import "./App.css";

const allCountriesUrl = "https://crio-location-selector.onrender.com/countries";

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [selectedCountry, setSelectedCounty] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getCountryData = async () => {
      const res = await fetch(allCountriesUrl);
      const data = await res.json();
      setCountriesList(data);
    };

    getCountryData();
  }, []);

  const countryChangeHandler = async (e) => {
    const res = await fetch(
      `https://crio-location-selector.onrender.com/country=${e.target.value}/states`
    );
    const data = await res.json();
    console.log(data);
    setStatesList(data);
    setSelectedCounty(e.target.value);
  };

  const stateChangeHandler = async (e) => {
    const res = await fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${e.target.value}/cities`
    );
    const data = await res.json();
    console.log(data);
    setCityList(data);
    setSelectedState(e.target.value);
  };

  function cityChangeHandler(e) {
    setSelectedCity(e.target.value);
  }

  return (
    <>
      <h1>Select Location</h1>
      <form className="selectContainer">
        <select id="countries" onChange={countryChangeHandler}>
          <option value="" disabled selected>
            Select Country
          </option>
          {countriesList?.map((country) => {
            return <option value={country}>{country}</option>;
          })}
        </select>
        <select id="state" onChange={stateChangeHandler}>
          <option value="" disabled selected>
            Select State
          </option>
          {statesList?.map((state) => {
            return <option value={state}>{state}</option>;
          })}
        </select>
        <select id="city" onChange={cityChangeHandler}>
          <option value="" disabled selected>
            Select City
          </option>
          {cityList?.map((city) => {
            return <option value={city}>{city}</option>;
          })}
        </select>
      </form>
      {selectedCity && (
        <h2>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </h2>
      )}
    </>
  );
}

export default App;
