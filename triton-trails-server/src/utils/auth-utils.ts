import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../createTable';
import { SECRET_KEY } from '../constants';
import { Request, Response } from "express";

const saltRounds = 10;

export const registerUser = async (req:Request, res:Response) => {
    try {
        const { username, displayName, password } = req.body as { username: string, displayName: string, password: string };
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).send({ error: 'Username already exists' });
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        console.log("Creating User ");
        const usr = await User.create({
            username,
            displayName,
            passwordHash,
            passwordSalt: salt,
        });
        res.status(201).send(usr);
        console.log("Created Trail ", usr);
    } catch(error) {
        console.log("Error on create " + error);
        return res.status(400).send({ error: `Trail could not be created, + ${error}` });
    }
};

export const loginUser = async (req:Request, res:Response) => {
    try {
        console.log("in login user");
        const { username, password } = req.body as { username: string, password: string };
        const user = await User.findOne({ where: { username } });

        if (!user) {
            res.status(401).send('User not found');
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            res.status(401).send('Invalid password');
            return null;
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        console.log("Token for user: ", username, " is ", token);

        res
        .status(201)
        .cookie('token', token, {
            httpOnly: false,      // Allows JavaScript access
            secure: true,        // Ensures the cookie is sent over HTTPS
            sameSite: 'strict',  // Prevents CSRF
            maxAge: 60 * 60 * 1000, // 1 hour expiration
        }).send({user});

        //res.status(201).send({user, token});
        console.log("Found User ", user);

        return { user, token };
    } catch(error) {
        console.log("Error on user find " + error);
        res.status(400).send({ error: `User could not be found, + ${error}` });
        return null;
    }
};
