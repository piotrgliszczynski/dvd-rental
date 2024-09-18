import React from 'react';
import Film from './Film';

const FilmList = (props) => {

    const tableHeader = () => {
        const keys = Object.keys(props.films[0] || []);
        return keys.map((key, index) => (
            <th key={index} style={{padding:'10px', textTransform:'uppercase'}}>{key}</th>
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
                    </tr>
                </thead>
                <tbody>
                    {filmRows()}
                </tbody>
            </table>
        </>
    )
}

export default FilmList;