import express from 'express';
import router from '../routes/books';

const app = express();

app.use("/", router);
app.use("/books", router);

export default app;