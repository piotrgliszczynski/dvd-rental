import React from 'react';
import { useNavigate } from 'react-router';

const Film = (props) => {
    const navigate = useNavigate();

    const filmRow = () => {
        const keys = Object.keys(props.film);
        return keys.map((key, index) => {
            return (
                <td key={index}>{props.film[key]}</td>
            )
        })
    }

    const onButtonClick = () => {
        navigate(`films/${props.film.film_id}`)
    }

    return (
        <tr>
            {filmRow()}
            <td key='button'>
                <button onClick={onButtonClick}>See more...</button>
            </td>
        </tr>
    )
}

export default Film;