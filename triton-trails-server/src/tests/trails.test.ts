import request from 'supertest';
import { sequelize, Trail, Route } from '../createTable'; // Adjust the path if needed
import app from '../index'; // Adjust the path if needed

describe('Trails with Routes API', () => {
    beforeAll(async () => {
        // Sync the database
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        // Close the database connection
        await sequelize.close();
    });

    describe('Create Trail and Add Route', () => {
        let trailId: number;

        it('should create a trail successfully', async () => {
            const trailData = {
                name: 'Trail with Route',
                description: 'A trail with an associated route',
            };

            const response = await request(app)
                .post('/trails')
                .send(trailData)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('name', trailData.name);
            expect(response.body).toHaveProperty('description', trailData.description);

            trailId = response.body.id; // Save trail ID for the next test
        });

        it('should create a route for the trail', async () => {
            const routeData = {
                startLatitude: 34.052235,
                startLongitude: -118.243683,
                endLatitude: 36.778259,
                endLongitude: -119.417931,
            };

            const response = await request(app)
                .post(`/trails/${trailId}/routes`)
                .send(routeData)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('startLatitude', routeData.startLatitude);
            expect(response.body).toHaveProperty('startLongitude', routeData.startLongitude);
            expect(response.body).toHaveProperty('endLatitude', routeData.endLatitude);
            expect(response.body).toHaveProperty('endLongitude', routeData.endLongitude);
            expect(response.body).toHaveProperty('TrailId', trailId);
        });

        it('should fetch all routes for the trail', async () => {
            const response = await request(app).get(`/trails/${trailId}/routes`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toHaveProperty('startLatitude', 34.052235);
            expect(response.body[0]).toHaveProperty('startLongitude', -118.243683);
            expect(response.body[0]).toHaveProperty('endLatitude', 36.778259);
            expect(response.body[0]).toHaveProperty('endLongitude', -119.417931);
            expect(response.body[0]).toHaveProperty('TrailId', trailId);
        });
    });
});
