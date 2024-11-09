import { createTrailServer, getTrails } from "./trail-utils";
import { Request, Response } from 'express';
import { Sequelize } from "sequelize";

export function createTrailsEndpoints (app: any, db: Sequelize) {
    // Create a new trail
    app.post("/trails", (req: Request, res: Response) => {

        createTrailServer(req, res, db);

    });

    // Get all expenses
    app.get("/trails", (req: Request, res: Response) => {

        getTrails(req, res, db);

    });

    // Get all expenses
    app.get("/image", (req: Request, res: Response) => {


    });

}
