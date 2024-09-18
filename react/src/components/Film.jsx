import React from 'react';

const Film = (props) => {

    const filmRow = () => {
        const keys = Object.keys(props.film);
        return keys.map((key, index) => {
            return (
                <td key={index}>{props.film[key]}</td>
            )
        })
    }

    return (
        <tr>
            {filmRow()}
            <td key='button'>
                <button>See more...</button>
            </td>
        </tr>
    )
}

export default Film;