import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from '../constants';
import { User } from '../createTable';

interface JwtTokenData extends JwtPayload {
  username: string;
  userId: number;
}

export function createUserEndpoints (app: any) {
    app.get("/user-info", (req: Request, res: Response) => {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).send("No token found");
            return;
        }
        const decoded = jwt.verify(token, SECRET_KEY) as JwtTokenData;
        if (!decoded) {
            res.status(401).send("Invalid token");
            return;
        }

        const userId = decoded.userId;

        (async() => {
            const user = await User.findByPk(userId);
            if (!user) {
                res.status(401).send("Failed to find user w/ Id" + userId);
            }
            res.status(200).send(user);
        })();
    });
}
