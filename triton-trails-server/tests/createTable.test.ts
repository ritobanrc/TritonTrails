import { sequelize, User, Trail, Route } from '../src/createTable';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('User Model', () => {
    it('should create and fetch a user', async () => {
        const user = await User.create({
            username: 'testuser',
            displayName: 'Test User',
            passwordHash: 'hashedpassword',
            passwordSalt: 'randomsalt',
        });

        expect(user).toBeDefined();
        expect(user.username).toBe('testuser');

        const fetchedUser = await User.findByPk(user.id);
        expect(fetchedUser?.displayName).toBe('Test User');
    });
});

describe('Trail Model', () => {
    it('should create and fetch a trail', async () => {
        const trail = await Trail.create({
            name: 'Andrew Trail',
            description: 'Pokemon everywhere!',
        });

        expect(trail).toBeDefined();
        expect(trail.name).toBe('Andrew Trail');

        const fetchedTrail = await Trail.findByPk(trail.id);
        expect(fetchedTrail?.description).toBe('Pokemon everywhere!');
    });
});

// describe('Route Model', () => {
//     it('should create and fetch routes for a trail', async () => {
//         const trail = await Trail.create({
//             name: 'Andrew Trail ',
//             description: 'Pokemon everywhere!',
//         });
//         console.log('Created Trail:', trail.toJSON());
//         const route = await Route.create({
//             startLatitude: 34.05,
//             startLongitude: -118.25,
//             endLatitude: 36.77,
//             endLongitude: -119.41,
//             TrailId: trail.id,
//         });
//         console.log('Created Route:', route.toJSON());
//         const fetchedRoute = await Route.findOne({ where: { TrailId: trail.id } });
//         console.log('Fetched Route:', fetchedRoute?.toJSON());
//         expect(fetchedRoute).toBeDefined();
//         expect(fetchedRoute?.startLatitude).toBe(34.05);
//         expect(fetchedRoute?.TrailId).toBe(trail.id);
//     });
// });
