import React from 'react';
import Film from './Film';
import FilmNavigation from './FilmNavigation';

const FilmList = (props) => {

  const tableHeader = () => {
    const keys = Object.keys(props.films[0] || []);
    return keys.map((key, index) => (
      <th key={index} style={{ padding: '10px', textTransform: 'uppercase' }}>{key}</th>
    ))
  }

  const filmRows = () => {
    return props.films.map((film, index) => {
      return <Film key={index} film={film} />
    })
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {tableHeader()}
            <th key='moreDetails' style={{ padding: '10px', textTransform: 'uppercase' }}>More Details</th>
          </tr>
        </thead>
        <tbody>
          {filmRows()}
        </tbody>
      </table>
      <FilmNavigation page={props.page} changePage={props.changePage} />
    </>
  )
}

export default FilmList;