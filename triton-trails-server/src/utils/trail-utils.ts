//import { Trail } from "../types/types";
import { Request, Response } from "express";
import { Sequelize } from "sequelize";

export async function createTrailServer(req: Request, res: Response, db:Sequelize) {
    //const { id, name, description, image } = req.body;

    try {
        // Type casting the request body to the expected format.
        const { id, name, description, image } = req.body as { id: number, name: string, description: string, image: string };
        console.log("id ", id);
        console.log("name ", name)
        console.log("description ", description)
        console.log("image ", image)
        if (!name || !id || !description) {
            console.log("bad format")
            return res.status(400).send({ error: "Missing required fields" });
        }
        console.log("running command")

        await db.models.Trail.create({
          id: id,
          name: name,
          description: description,
          image: image
        });

        res.status(201).send({ id, name, description, image });

    } catch (error) {
        console.log("Error on create")
        return res.status(400).send({ error: `Trail could not be created, + ${error}` });
    };
}

export async function getTrails(req: Request, res: Response, db: Sequelize) {
    try {
        const trails = await db.models.Trail.findAll();
        res.status(200).send({"data": trails})

    } catch (error) {

        return res.status(400).send({ error: `Could not get trails, + ${error}` });

    };
}
