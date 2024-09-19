import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FilmDetail = () => {
  const { id } = useParams();
  const [filmDetails, setFilmDetails] = useState({});

  const renderFilmDetails = () => {

    if (!filmDetails || !filmDetails.actors) {
      return (<div>Loading data...</div>);
    }

    const keys = Object.keys(filmDetails).filter(film => film !== 'fulltext'
      && film !== 'language_id'
      && film !== 'last_update'
      && film !== 'special_features'
      && film !== 'actors')
    return (
      <div style={{ textAlign: 'left' }}>
        {keys.map(key => (
          <div key={key}>
            <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{key} : </span>
            <span>{filmDetails[key]}</span>
          </div>
        ))}
        <div style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
          ACTORS:
        </div>
        <div style={{ marginLeft: '10px' }}>
          {filmDetails.actors.map((actor, index) => (
            <div key={index}>{actor.first_name} {actor.last_name}</div>
          ))}
        </div>
        <button style={{ margin: '15px' }}>Rent now!</button>
      </div>
    )
  }

  const fetchFilmData = () => {
    fetch(`${import.meta.env.VITE_FILM_API_URL}/films/${id}`)
      .then(response => response.json())
      .then(response => setFilmDetails(response))
      .catch(err => console.error(err));
  }

  useEffect(() => { fetchFilmData() }, []);


  return (
    <div>
      {renderFilmDetails()}
    </div>
  )
}

export default FilmDetail;