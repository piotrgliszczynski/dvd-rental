import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';
import cors from 'cors';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PWD,
    port: process.env.POSTGRES_PORT
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/films', async (req, res) => {
    try {
        const { category } = req.query;
        let queryString = "";
        if (!category || category.toLowerCase() === 'all') {
            queryString = `
                SELECT 
                    f.film_id, f.title, f.release_year, 
                    f.rental_duration, f.rental_rate 
                FROM film f LIMIT 10`;
        } else {
            queryString = `
                SELECT
                    f.film_id, f.title, f.release_year,
                    f.rental_duration, f.rental_rate
                FROM film f 
                    JOIN film_category fc using(film_id) 
                    JOIN category c using(category_id)
                WHERE c.name = '${category}' LIMIT 10`
        }

        const result = await pool.query(queryString);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({message: 'Films not found in the database!'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

app.get('/films/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let filmDetails = {}
        const filmResponse = await pool.query(
            `SELECT f.*, l.name as language
            FROM film f JOIN language l using(language_id)
            WHERE film_id = ${id}`
        )

        if (filmResponse.rows.length == 1) {
            filmDetails = filmResponse.rows[0];
            const actorsResponse = await pool.query(
                `SELECT a.first_name, a.last_name
                FROM actor a JOIN film_actor fa using(actor_id)
                WHERE fa.film_id = ${id}`
            );
    
            filmDetails.actors = actorsResponse.rows;
            res.status(200).json(filmDetails);
        } else {
            res.status(404).json({message: 'Film not found or more than one film found'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

app.get('/categories', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT name
            FROM category`, []
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json('Films not found in the database!');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
});
