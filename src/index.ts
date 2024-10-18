import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import router from './routes';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
dotenv.config();

const PORT = process.env.PORT || 5000;

const ORIGIN = process.env.ORIGIN || 'http://localhost:5173';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		credentials: true,
		origin: ORIGIN,
	})
);
app.use(fileUpload({ createParentPath: true }));
app.use(
	session({
		name: 'session',
		secret: process.env.SECRET || '',
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false, // true, если используете https
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24, // Срок жизни сессии (1 день)
		},
	})
);

app.use('/api', router);

app.listen(PORT, () => {
	console.log(`App has been started on port ${PORT}`);
});
