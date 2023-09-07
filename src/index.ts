import express from 'express';
import startDb from './db/startDb';
import routes from './routes';
import cors from 'cors';

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())
app.use(routes);

app.listen(process.env.PORT, () => {
    startDb();
    console.log(`Sever runing in: http://localhost:${process.env.PORT}`)
})