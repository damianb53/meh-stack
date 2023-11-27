import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import loginRouter from './src/login.js';

const port = 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
    const conprint = (v) => (typeof v !== 'undefined' ? v : null);
    res.locals.conprint = conprint;
    next();
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Home page' });
});

app.use('/login', loginRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
