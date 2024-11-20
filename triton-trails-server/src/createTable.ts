import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
});

interface UserAttributes {
    id?: number;
    username: string;
    displayName: string;
    passwordHash: string;
    passwordSalt: string;
}

interface TrailAttributes {
    id?: number;
    name: string;
    description: string;
    image?: string;
}

interface ImageAttributes {
    id?: number;
    image: Buffer;
    TrailId?: number;
}
interface RouteAttributes
{
    id?: number; 
    startLatitude: number; 
    startLongitude: number; 
    endLatitude: number; 
    endLongitude: number; 
    TrailId?: number

}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
interface TrailCreationAttributes extends Optional<TrailAttributes, 'id'> {}
interface ImageCreationAttributes extends Optional<ImageAttributes, 'id'> {}
interface RouteCreation extends Optional<RouteAttributes, 'id'>{}
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public displayName!: string;
    public passwordHash!: string;
    public passwordSalt!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordSalt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: false,
    }
);
class Trail extends Model<TrailAttributes, TrailCreationAttributes> implements TrailAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public image?: string;
    // public latitude!: number; 
    // public longitude!: number; 
}

Trail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        // latitude:
        // {
        //     type:DataTypes.DOUBLE, 
        //     allowNull: false,
        // },
        // longitude:
        // {
        //     type:DataTypes.DOUBLE,
        //     allowNull: false, 
        // },
    },
    {
        sequelize,
        modelName: 'Trail',
        tableName: 'Trail',
        timestamps: false,
    }
);
class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
    public id!: number;
    public image!: Buffer;
    public TrailId?: number;
}

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Image',
        timestamps: false,
    }
);
class Route extends Model<RouteAttributes, RouteCreation> implements RouteAttributes{
    public id!: number;
    public startLatitude!: number;
    public startLongitude!: number;
    public endLatitude!: number;
    public endLongitude!: number;
    public TrailId?: number;
}
Route.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        startLatitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        startLongitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        endLatitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        endLongitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        TrailId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Trail', //this will link a trail to a map 
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'Route',
        timestamps: false,
    }
);
Trail.hasMany(Image);         
Image.belongsTo(Trail);   
Trail.hasMany(Route);
Route.belongsTo(Trail, { foreignKey: 'TrailId', onDelete: 'CASCADE' });

User.belongsToMany(Trail, { through: 'User_Trails', timestamps: false }); 
Trail.belongsToMany(User, { through: 'User_Trails', timestamps: false }); 

export { sequelize, User, Trail, Image, Route };

export const initDB = async () => {
    await sequelize.sync({force: true});
    console.log('Database synchronized');
    console.log(await sequelize.getQueryInterface().showAllTables()); 
    return { sequelize, User, Trail, Image, Route};
};

export default initDB;
