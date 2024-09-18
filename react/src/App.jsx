import { useEffect, useState } from 'react'
import './App.css'
import FilmList from './components/FilmList';
import Category from './components/Category';

function App() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('All');

  const changeCategory = async (cat) => {
    setCategory(cat);
    fetchData(cat);
  }

  const fetchData = async (cat) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_FILM_API_URL}/films?category=${cat}`);
      if (!response.ok) {
        throw new Error('Data could not be fetched!');
      }

      const filmJson = await response.json();
      setData(filmJson);
    } catch (err) {
      console.error('Error fetching socks:', err);
    }
  }

  useEffect(() => {fetchData(category)}, []);

  return (
    <>
      <h1>DVD RENTAL</h1>
      <Category changeCategory={changeCategory}/>
      <FilmList films={data}/>
    </>
  )
}

export default App
