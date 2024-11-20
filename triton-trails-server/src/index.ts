import { Request, Response } from "express";
import { createTrailsEndpoints } from "./utils/trails-endpoints";
import initDB from "./createTable";
import bodyParser from 'body-parser';
import { registerUser, loginUser } from './utils/auth-utils'; 
import { createAuthEndpoints } from "./utils/auth-endpoints";
import { createUserEndpoints } from "./utils/user-endpoints";


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8080;

app.use(cors({
  origin: 'htpp://localhost:3000', // Replace with your frontend's URL
  credentials: true,                     // Allow cookies to be sent
}));
app.use(bodyParser.json({ limit: '100mb' })); // allows image string to be passed via JSON
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json());
app.use(cookieParser());

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

(async () => {
    const db = await initDB();
    app.get("/", (req: Request, res: Response) => {
        res.status(200).send("This page is intentionally blank.");
    });

    createTrailsEndpoints(app, db.sequelize);
    createAuthEndpoints(app);
    createUserEndpoints(app);

})();
