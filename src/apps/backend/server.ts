import express from 'express';
import cors from 'cors';
import connectDb from './database/db.ts';

const app = express();
app.use(express.json());
app.use(cors());

await connectDb();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});