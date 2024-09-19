import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css'
import FilmList from './components/FilmList';
import Category from './components/Category';
import FilmDetail from './components/FilmDetail';

function App() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  const changeCategory = async (cat) => {
    setCategory(cat);
    setPage(1);
    fetchData(cat, 1);
  }

  const changePage = async (newPage) => {
    setPage(newPage);
    fetchData(category, newPage);
  }

  const fetchData = async (cat, page) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_FILM_API_URL}/films?category=${cat}&page=${page}`);
      if (!response.ok) {
        throw new Error('Data could not be fetched!');
      }

      const filmJson = await response.json();
      setData(filmJson);
    } catch (err) {
      console.error('Error fetching socks:', err);
    }
  }

  useEffect(() => { fetchData(category, page) }, []);

  return (
    <>
      <Router>
        <h1>DVD RENTAL</h1>
        <Routes>
          <Route exact path="/" element={(
            <>
              <Category changeCategory={changeCategory} />
              <FilmList films={data} page={page} changePage={changePage} />
            </>
          )} />
          <Route path="/films/:id" element={<FilmDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
