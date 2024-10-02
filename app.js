import express from "express";
import { configDotenv } from "dotenv";
configDotenv();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`)
        })
    } catch(err) {
        console.error(err)
    }
}

start()