import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { API } from './api';
import cookieSession from 'cookie-session';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions: CorsOptions = {
    origin: process.env.CLIENT_URL,
    allowedHeaders: ['Content-Type'],
    credentials: true,
}

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_SECRET!],
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || false,
}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/api', API);

app.listen(PORT, () => {
    console.log(`App listening at port: ${PORT}`);
});