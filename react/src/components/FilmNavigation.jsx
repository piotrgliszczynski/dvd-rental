import React from 'react';

const FilmNavigation = (props) => {

  const { page, changePage } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'right' }}>
      <button onClick={() => page > 1 ? changePage(page - 1) : changePage(page)}>Back</button>
      <span style={{ display: 'inline-flex', fontWeight: 'bold', alignItems: 'center' }}>[ {page} ]</span>
      <button onClick={() => changePage(page + 1)}>Next</button>
    </div >
  )
}

export default FilmNavigation;