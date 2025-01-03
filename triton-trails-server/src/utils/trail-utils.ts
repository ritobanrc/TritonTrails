import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Route } from "../models/route";
import { User } from "../models/user";
import { Trail } from "../models/trail";
import { UserTrail } from "../models/user-trail";
import { SECRET_KEY } from '../constants';
import jwt from 'jsonwebtoken';

export async function createTrailServer(req: Request, res: Response, db:Sequelize) {
    try {
        // Type casting the request body to the expected format.
        const { name, description, image } = req.body as { name: string, description: string, image: string };

        if (!name) {
            console.log("Must provide a trail name.")
            return res.status(400).send({ error: "Must provide a trail name" });
        }

        // Splitting after the `,` is a way to get rid of the
        // `data:image/jpeg;base64,` part that is prepended by converting it to
        // a dataURL
        const imageData = Buffer.from(image.split(',')[1], 'base64');

        const trail = await db.models.Trail.create({
          name: name,
          description: description,
          image: null, // TODO get rid of this column
        });

        const img = await db.models.Image.create({
            image: imageData,
            // NOTE: I could also leave this blank, and do `(trail as
            // any).addImage(img)` afterwards. the ``as any'' is necessary
            // because TypeScript doesn't know the functions that sequelize
            // creates at runtime
            TrailId: trail.get('id'),  
        });

        res.status(201).send(trail);
        console.log("Created Trail ", trail);

    } catch (error) {
        console.log("Error on create " + error);
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
export async function Visited(req: Request, res: Response) {
    try {
        const userId = Number(req.query.userId);
        const trailId = Number(req.query.trailId);
        const rating = Number(req.query.rating);

        const user = await User.findByPk(Number(userId));
        const trail = await Trail.findByPk(Number(trailId));

        if (!user || !trail) {
            return res.status(404).send({ error: "User or Trail not found." });
        }
        await user.$add('trail', trail, { through: { rating: rating }});
        console.log(`User ${userId} marked trail ${trailId} as visited.`);
        res.status(200).send({ message: "Trail marked as visited." });
    } catch (error) {
        console.log("Error on Visited:", error);
        return res.status(400).send({ error: `Could not mark trail as visited: ${error}` });
    }
}

export async function getVisited(req: Request, res: Response, db: Sequelize) {
    try {
        const { userId } = req.params;
        const userTrails = await UserTrail.findAll({
            where: { userId: userId }
        });

        if (!userTrails || userTrails.length === 0) {
            return res.status(404).send({ message: "No visited trails found for this user." });
        }

        // Extract trail IDs from userTrails
        const trailIds = userTrails.map(ut => ut.TrailId);

        // Fetch all trails that the user has visited
        const trails = await db.models.Trail.findAll({
            where: { id: trailIds }
        });

        res.status(200).send({ data: trails });

    } catch (error) {
        console.error('Error fetching visited trails:', error);
        return res.status(500).send("Could not get trails: ");
    }
}

export const getTrailRating = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send("No token found");
        }

        const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
        if (!decoded) {
            return res.status(401).send("Invalid token");
        }

        const userId = decoded.userId;

        const { trailId } = req.params;
        if (!trailId) {
            return res.status(400).send("Trail ID is required");
        }

        const userTrail = await UserTrail.findOne({
            where: {
                UserId: userId,
                TrailId: trailId,
            },
        });

        if (!userTrail) {
            return res.status(404).send("Rating not found for this trail");
        }

        res.status(200).json({ rating: userTrail.rating });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};
