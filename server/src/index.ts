import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import 'dotenv/config';
import authRouter from "./routes/auth-routes";


const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));



app.use("/api/auth", authRouter);


app.listen(port, () => {
    console.log('Server started on port 5000');
});
