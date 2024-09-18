import React, {useState, useEffect} from 'react';

const Category = (props) => {
    const [categoryNames, setCategoryNames] = useState([]);

    const categoriesOptions = () => {

        return categoryNames
            .map(category => category.name)
            .map(categoryName => (
                <option key={categoryName}>{categoryName}</option>
            ))
    }

    const onCategoryChange = (event) => {
        props.changeCategory(event.target.value);
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_FILM_API_URL}/categories`);
            if (!response.ok) {
            throw new Error('Data could not be fetched!');
            }
    
            const categoriesJson = await response.json();
            setCategoryNames(categoriesJson);
        } catch (err) {
            console.error('Error fetching socks:', err);
        }
    }

    useEffect( () => {fetchCategories()}, []);

    return (
        <>
            <div style={{display: 'flex'}}>
            <h3 style={{margin: '0 10px'}}>Filter categories by: </h3>
            <select onChange={onCategoryChange}>
                <option key='All'>All</option>
                {categoriesOptions()}
            </select>
            </div>
        </>
    )
}

export default Category;