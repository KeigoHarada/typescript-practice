import express from 'express';
import router from '../routes/books';
import bodyParser from 'body-parser';
import cors from 'cors';
import { METHODS } from 'http';

const app = express();
app.use(cors({ origin: 'http://localhost:5173', methods: 'GET,POST,PUT,DELETE', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());

app.use("/", router);
app.use("/books", router);

export default app;