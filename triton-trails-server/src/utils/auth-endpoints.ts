import { registerUser, loginUser } from "./auth-utils";
import { Request, Response } from 'express';

export function createAuthEndpoints (app: any) {
    // Create a new user
    app.post("/register-user", (req: Request, res: Response) => {
        registerUser(req, res);
    });

    // Get the user
    app.post("/login-user", (req: Request, res: Response) => {
        loginUser(req, res);
    });

}
