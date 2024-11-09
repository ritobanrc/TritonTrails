import { Request, Response } from "express";
import { createTrailsEndpoints } from "./utils/trails-endpoints";
import initDB from "./createTable";
import bodyParser from 'body-parser';


const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());


app.use(bodyParser.json({ limit: '100mb' })); //added to allow for image string to be passed via json

app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

app.use(express.json());

// Start the server
app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});

// Initialize the database and start the server
(async () => {
    const db = await initDB();

    // Root endpoint to get test if the server is running
    app.get("/", (req: Request, res: Response) => {
        res.status(200).send("This page is intentionally blank.");
    });

    createTrailsEndpoints(app, db);

})();
