import { Sequelize } from 'sequelize-typescript';

import { Trail } from './models/trail'
import { Image } from './models/image'
import { User } from './models/user'
import { Route } from './models/route'
import { UserTrail } from './models/user-trail'

// Initialize Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
});

// Export and initialize
export { sequelize, User, Trail, Image, Route, UserTrail };

export const initDB = async () => {
    sequelize.addModels([User, Trail, Image, Route, UserTrail]);

    await sequelize.sync();
    console.log('Database synchronized');
    console.log(await sequelize.getQueryInterface().showAllTables());
    return { sequelize, User, Trail, Image, Route };
};
export default initDB;

