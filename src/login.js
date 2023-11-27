import express from 'express';
import mysql, { createPool } from 'mysql2/promise';

const pool = createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'mysql',
    password: 'password',
    database: 'demo',
});

const app = express.Router();

app.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password });

        const [results] = await pool.query(
            'SELECT * FROM user WHERE email = ? LIMIT 1',
            [email],
        );

        // Email not match
        if (results.length === 0) {
            return res.render('login', {
                title: 'Login',
                email,
                password,
                credentialsMatch: false,
            });
        }

        const user = results[0];

        // Password not match
        if (user.password !== password) {
            return res.render('login', {
                title: 'Login',
                email,
                password,
                credentialsMatch: false,
            });
        }

        res.render('login', {
            title: 'Login',
            email,
            password,
            credentialsMatch: true,
        });
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default app;
