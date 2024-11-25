import { createTrailServer, getTrails } from "./trail-utils";
import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Route } from "../createTable";

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


    app.post("/trails/:id/routes", async (req: Request, res: Response) => {
        const { id } = req.params;
        const { startLatitude, startLongitude, endLatitude, endLongitude } = req.body;
        if (
            typeof startLatitude !== "number" ||
            typeof startLongitude !== "number" ||
            typeof endLatitude !== "number" ||
            typeof endLongitude !== "number"
        ) {
            return res.status(400).json({ error: "All latitude and longitude fields must be numbers." });
        }
        try {
            const route = await Route.create({
                startLatitude,
                startLongitude,
                endLatitude,
                endLongitude,
                TrailId: parseInt(id, 10),
            });

            console.log(`[POST /trails/${id}/routes] Created route for trail: ${id}`);
            res.status(201).json(route);
        } catch (error: any) {
            console.error(`[POST /trails/${id}/routes] Failed to HELLO route: ${error.message || error}`);
            res.status(500).json({ error: "Failed to HELLOroute." });
        }
    });
    app.get("/trails/:id/routes", async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const routes = await Route.findAll({
                where: { TrailId: id },
            });

            console.log(`[GET /trails/${id}/routes] Fetched ${routes.length} routes for trail: ${id}`);
            res.status(200).json(routes);
        } catch (error: any) {
            console.error(`[GET /trails/${id}/routes] Failed to fetch routes: ${error.message || error}`);
            res.status(500).json({ error: "Failed to fetch routes." });
        }
    });
    app.put("/trails/:trailId/routes/:routeId", async (req: Request, res: Response) => {
        const { trailId, routeId } = req.params;
        const { startLatitude, startLongitude, endLatitude, endLongitude } = req.body;

        try {
            const route = await Route.findOne({
                where: {
                    id: routeId,
                    TrailId: trailId,
                },
            }) as Route;

            if (!route) {
                return res.status(404).json({ error: "Route not found for this trail." });
            }

            await route.update({
                startLatitude: startLatitude ?? route.startLatitude,
                startLongitude: startLongitude ?? route.startLongitude,
                endLatitude: endLatitude ?? route.endLatitude,
                endLongitude: endLongitude ?? route.endLongitude,
            });

            console.log(`[PUT /trails/${trailId}/routes/${routeId}] Updated route: ${routeId}`);
            res.status(200).json(route);
        } catch (error: any) {
            console.error(`[PUT /trails/${trailId}/routes/${routeId}] Failed to update route: ${error.message || error}`);
            res.status(500).json({ error: "Failed to update route." });
        }
    });
    app.delete("/trails/:trailId/routes/:routeId", async (req: Request, res: Response) => {
        const { trailId, routeId } = req.params;

        try {
            const route = await Route.findOne({
                where: {
                    id: routeId,
                    TrailId: trailId,
                },
            }) as Route;

            if (!route) {
                return res.status(404).json({ error: "Route not found for this trail." });
            }

            await route.destroy();

            console.log(`[DELETE /trails/${trailId}/routes/${routeId}] Deleted route: ${routeId}`);
            res.status(200).json({ message: "Route deleted successfully." });
        } catch (error: any) {
            console.error(`[DELETE /trails/${trailId}/routes/${routeId}] Failed to delete route: ${error.message || error}`);
            res.status(500).json({ error: "Failed to delete route." });
        }
    });
}
