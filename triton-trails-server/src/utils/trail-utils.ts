import { Trail } from "../types/types";
import { Request, Response } from "express";
import { TrailModel } from "../trail"

export async function createTrailServer(req: Request, res: Response, trail: Trail[]) {
    const { name, description, image } = req.body;

    if (!name || !description || !image) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        const newTrail = await TrailModel.create({
            name,
            description,
            image
        });
        res.status(201).send(newTrail);
    } catch (error) {
        console.error('Error creating trail:', error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export function getTrails(req: Request, res: Response, trails: Trail[]) {
    res.status(200).send({ "data": trails });
}