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
  origin: 'http://localhost:3000', // Replace with your frontend's URL
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


    app.post("/register", async (req: Request, res: Response) => {
        const { username, displayName, password } = req.body;
        try {
            const user = await registerUser(username, displayName, password);
            res.status(201).json({ message: "User registered successfully", user });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: "An unknown error occurred" });
            }
        }
    });
    app.post("/login", async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            const { user, token } = await loginUser(username, password);
            res.status(200).json({ message: "Login successful", user, token });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: "An unknown error occurred" });
            }
        }
    });
    createTrailsEndpoints(app, db.sequelize);
    createAuthEndpoints(app);
    createUserEndpoints(app);

})();
