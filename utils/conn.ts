import { MongoClient } from 'mongodb';
import 'dotenv/config';

const connectionString = process.env.MONGO_URL!;
const client = new MongoClient(connectionString)

const db = client.db(process.env.MONGO_DB);
const userCollection = db.collection('users');
const movieCollection = db.collection('movies');

userCollection.createIndex({ email: 1 }, { unique: true });

export { userCollection, movieCollection };