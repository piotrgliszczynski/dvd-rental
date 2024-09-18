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
        const result = await pool.query(
            `SELECT 
                f.film_id, f.title, f.description, 
                f.release_year, l.name as language, 
                f.rental_duration, f.rental_rate, f.length 
            FROM film f JOIN language l using(language_id)
            LIMIT 10`, []
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
