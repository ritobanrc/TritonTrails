import { createTrailServer, getTrails } from "./trail-utils";
import { Request, Response } from 'express';
import { Sequelize } from "sequelize";

export function createTrailsEndpoints (app: any, db: Sequelize) {
    // Create a new trail
    app.post("/trails", (req: Request, res: Response) => {
        createTrailServer(req, res, db);
    });

    // Get all trails
    app.get("/trails", (req: Request, res: Response) => {
        getTrails(req, res, db);
    });

    /// Returns the list of images that match the given trail ID.
    app.get("/trail_images/:id", (req: Request, res: Response) => {
        db.models.Image.findAll({
            attributes: ['id'],
            where: {
                TrailId: req.params.id,
            }
        }).then((images) => {
            console.log("[/trail_images] Returned images for trail id: ", req.params.id);
            res.send(images.map((image) => image.get('id')));
        }).catch((error) => {
            console.log("ERROR: [/trail_images] Failed for trail id: ", req.params.id);
        });
    });

    /// Returns the image with ID given by the parameter
    app.get("/image/:id", (req: Request, res: Response) => {
        console.log("[/image] Requested image id: ", req.params.id);
        (async() => {
            const result = await db.models.Image.findByPk(req.params.id as any);
            if (result) {
                console.log("[/image] Requested image found: ", req.params.id);

                res.setHeader('Content-Type', 'image/jpeg');
                res.status(200).send(result.get('image'));
            } else {
                console.log("[/image] Image id not found: " + req.params.id);
                res.status(404).send("Image not found.");
            }
        })();
    });

}
