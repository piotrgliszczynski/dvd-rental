import { useEffect, useState } from 'react'
import './App.css'
import FilmList from './components/FilmList';

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_FILM_API_URL}/films`);
      if (!response.ok) {
        throw new Error('Data could not be fetched!');
      }

      const filmJson = await response.json();
      setData(filmJson);
    } catch (err) {
      console.error('Error fetching socks:', err);
    }
  }

  useEffect(() => {fetchData()}, []);

  return (
    <>
      <h1>DVD RENTAL</h1>
      <FilmList films={data}/>
    </>
  )
}

export default App
