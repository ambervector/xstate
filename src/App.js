import { useEffect, useState, useRef } from "react";
import "./App.css";

const allCountriesUrl = "https://crio-location-selector.onrender.com/countries";

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [selectedCountry, setSelectedCounty] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countryRef = useRef();
  const stateRef = useRef();

  const cityRef = useRef();

  useEffect(() => {
    const getCountryData = async () => {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/countries`
      );
      console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        setCountriesList(data);
      } else if (res.status === 500) {
        return;
      }
    };
    getCountryData();
  }, []);

  const countryChangeHandler = async (e) => {
    const res = await fetch(
      `https://crio-location-selector.onrender.com/country=${e.target.value}/states`
    );

    if (res.status === 200) {
      const data = await res.json();
      const stateInput = stateRef.current;
      stateInput.disabled = false;
      setStatesList(data);
      setSelectedCounty(e.target.value);
    } else if (res.status === 500) {
      return;
    }
  };

  const stateChangeHandler = async (e) => {
    const res = await fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${e.target.value}/cities`
    );
    const data = await res.json();
    console.log(data);
    setCityList(data);
    const cityInput = cityRef.current;
    cityInput.disabled = false;
    setSelectedState(e.target.value);
  };

  function cityChangeHandler(e) {
    setSelectedCity(e.target.value);
  }

  return (
    <>
      <h1>Select Location</h1>
      <form className="selectContainer">
        <select ref={countryRef} id="countries" onChange={countryChangeHandler}>
          <option value="" disabled selected>
            Select Country
          </option>
          {countriesList?.map((country) => {
            return <option value={country}>{country}</option>;
          })}
        </select>
        <select
          id="state"
          onChange={stateChangeHandler}
          ref={stateRef}
          disabled
        >
          <option value="" selected>
            Select State
          </option>
          {statesList?.map((state) => {
            return <option value={state}>{state}</option>;
          })}
        </select>
        <select ref={cityRef} id="city" onChange={cityChangeHandler} disabled>
          <option value="" selected>
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
