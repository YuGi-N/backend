import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions: CorsOptions = {
    origin: process.env.CLIENT_URL,
    allowedHeaders: ['Content-Type'],
    credentials: true,
}

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(corsOptions));

app.listen(PORT, () => {
    console.log(`App listening at port: ${PORT}`);
});