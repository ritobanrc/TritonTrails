import { createTrailServer, getTrails } from "./trail-utils";
import { Request, Response } from 'express';

export function createExpenseEndpoints(app: any, trails: any) {
    // Create a new trail
    app.post("/trail", (req: Request, res: Response) => {

        createTrailServer(req, res, trails);

    });

    // Get all expenses
    app.get("/trails", (req: Request, res: Response) => {

        getTrails(req, res, trails);

    });

}