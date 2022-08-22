import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { API } from './api';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions: CorsOptions = {
    origin: process.env.CLIENT_URL,
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
    credentials: true,
}

app.set("trust proxy", 1);
app.use(cookieSession({
    name: 'session',
    // domain: process.env.DOMAIN,
    keys: [process.env.COOKIE_SECRET!],
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || false,
    sameSite: 'lax',
    path: '/',
}));

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', API);

app.listen(PORT, () => {
    console.log(`App listening at port: ${PORT}`);
});