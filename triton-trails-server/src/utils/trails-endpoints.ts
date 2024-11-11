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
        console.log("[/image] Requested image id: ", req.query.id);
        (async() => { 
            const result = await db.models.Image.findByPk(req.query.id as any);
            if (result) {
                console.log("[/image] Requested image found: ", req.query.id);

                res.setHeader('Content-Type', 'image/jpeg');
                res.status(200).send(result.get('image'));
            } else {
                console.log("[/image] Image id not found: " + req.query.id);
                res.status(404).send("Image not found.");
            }
        })();
    });

}
