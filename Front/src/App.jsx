import { useState } from 'react'
import GameCategoryGraph from './components/GameCategoryGraph';
import TimeCategoryGraph from './components/TimeCategoryGraph';
import MostPlayedGraph from './components/MostPlayedGraph';
import MostPlayedDatesGraph from './components/MostPlayedDatesGraph';
import MostPlayedCountryGraph from './components/MostPlayedCountryGraph';
import MostPlayedDiscountGraph from './components/MostPlayedDiscountGraph';

function App() {
  const [searchType, setSearchType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const createGraph = () => {
    if (searchType === "gameCategory") {
      return (
        <section className="w-3/4 my-12 mx-auto" id="graph-section">
          <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
            <GameCategoryGraph />
          </div>
        </section>
      );
    } else if (searchType === "timeCategory") {
      return (
        <section className="w-3/4 my-12 mx-auto" id="graph-section">
          <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
            <TimeCategoryGraph />
          </div>
        </section>
      );
    } else if (searchType === "mostPlayed") {
      if (startDate !== "" && endDate !== "") {
        return (
          <section className="w-3/4 my-12 mx-auto" id="graph-section">
            <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
              <MostPlayedDatesGraph startDate={startDate} endDate={endDate} />
            </div>
          </section>
        );
      } else {
        return (
          <section className="w-3/4 my-12 mx-auto" id="graph-section">
            <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
              <MostPlayedGraph />
            </div>
          </section>
        );
      }
    } else if (searchType === "mostPlayedCountry") {
      if (countryCode !== "") {
        return (
          <section className="w-3/4 my-12 mx-auto" id="graph-section">
            <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
              <MostPlayedCountryGraph countryCode={countryCode} />
            </div>
          </section>
        );
      }
    } else if (searchType === "mostPlayedDiscount") {
      return (
        <section className="w-3/4 my-12 mx-auto" id="graph-section">
          <div className="border bg-white p-6 rounded-md shadow-md overflow-hidden">
            <MostPlayedDiscountGraph />
          </div>
        </section>
      );
    } 
  }

  return (
    <>
      <h1 className='mt-8 text-3xl text-center font-bold'> DASHBOARD STEAM </h1>

      <section className='flex w-full px-8 mt-10'>
        <div className='flex flex-col w-1/6 mr-16'>
          <label className='text-sm font-semibold mb-2'>Tipo de búsqueda</label>
          <select id="statistics-searchType" className="p-3 rounded-md bg-white shadow-md"
            onChange={(e) => setSearchType(e.target.value)}>
            <option value=""></option>
            <option value="gameCategory"> Número de juegos por categoría </option>
            <option value="timeCategory"> Tiempo de juego por categoría </option>
            <option value="mostPlayed"> Juegos más jugados </option>
            <option value="mostPlayedCountry"> Juegos más jugados por país </option>
            <option value="mostPlayedDiscount"> Juegos más jugados con descuento </option>
          </select>
        </div>

        {searchType === 'mostPlayed' ? (
          <div className='flex flex-col w-1/12 mr-16'>
            <label className='text-sm font-title font-semibold mb-4'>Fecha inicio</label>
            <input type="date" id="statistics-startDate" value={startDate} className="h-11 p-3 rounded-md bg-white shadow-md font-paragraph"
              onChange={(e) => setStartDate(e.target.value)}></input>
          </div>
        ) : null}

        {searchType === 'mostPlayed' ? (
          <div className='flex flex-col w-1/12 mr-16'>
            <label className='text-sm font-title font-semibold mb-4'>Fecha fin</label>
            <input type="date" id="statistics-startDate" value={endDate} className="h-11 p-3 rounded-md bg-white shadow-md font-paragraph"
              onChange={(e) => setEndDate(e.target.value)}></input>
          </div>
        ) : null}

        {searchType === 'mostPlayedCountry' ? (
          <div className='flex flex-col w-1/6 mr-16'>
            <label className='text-sm font-title font-semibold mb-4'>País</label>
            <select id="statistics-searchType" className="p-3 rounded-md bg-white shadow-md"
              onChange={(e) => setCountryCode(e.target.value)}>
              <option value=""></option>
              <option value="AR"> Argentina </option>
              <option value="AU"> Australia </option>
              <option value="CA"> Canadá </option>
              <option value="CL"> Chile </option>
              <option value="CN"> China </option>
              <option value="US"> Estados Unidos </option>
              <option value="FI"> Finlandia </option>
              <option value="FR"> Francia </option>
              <option value="HK"> Hong Kong </option>
              <option value="IS"> Islandia </option>
              <option value="IT"> Italia </option>
              <option value="LV"> Letonia </option>
              <option value="LT"> Lituania </option>
              <option value="NZ"> Nueva Zelanda </option>
              <option value="PL"> Polonia </option>
            </select>
          </div>
        ) : null}
      </section>

      {createGraph()}
    </>
  )
}

export default App
