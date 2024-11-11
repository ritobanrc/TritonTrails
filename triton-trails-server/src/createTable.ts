// import sqlite3 from "sqlite3";
// import { Sequelize, DataTypes } from "sequelize";
// import { open } from "sqlite";

// const initDB = async () => {
//     const sequelize = new Sequelize({
//       dialect: 'sqlite',
//       storage: 'database.sqlite'
//     });

//     const Trail = sequelize.define(
//         'Trail',
//         {
//             id: {
//                 type: DataTypes.INTEGER,
//                 autoIncrement: true,
//                 primaryKey: true,
//             },
//             name: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             description: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             image: {
//                 type: DataTypes.STRING,
//             }
//         }, 
//         {
//             timestamps: false
//         }
//     );
//     const Image = sequelize.define(
//         'Image',
//         {
//             id: {
//                 type: DataTypes.INTEGER,
//                 autoIncrement: true,
//                 primaryKey: true,
//             },
//             image: {
//                 type: DataTypes.BLOB('long'),
//                 allowNull: false,
//             }
//         },
//         {
//             timestamps: false
//         }
//     );
//     Trail.hasMany(Image);  // creates a TrailId column in the Image table
//     Image.belongsTo(Trail);  

//     export const User = sequelize.define(
//         'User',
//         {
//             id: {
//                 type: DataTypes.INTEGER,
//                 autoIncrement: true,
//                 primaryKey: true,
//             },
//             username: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             displayName: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             passwordHash: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             passwordSalt: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//         },
//         {
//             timestamps: false
//         }
//     );
//     User.belongsToMany(Trail, { through: 'User_Trails', timestamps: false });
//     Trail.belongsToMany(User, { through: 'User_Trails',  timestamps: false  });

//     await sequelize.sync();


//     //const trail = await Trail.create({
//       //name: "foo",
//       //description: "",
//     //});

//     //const img = await Image.create({
//         //image: "hello world",
//     //});
//     //trail.addImage(img);


//     return sequelize;
// };

// export default initDB;
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

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
interface TrailCreationAttributes extends Optional<TrailAttributes, 'id'> {}
interface ImageCreationAttributes extends Optional<ImageAttributes, 'id'> {}
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
    },
    {
        sequelize,
        modelName: 'Trail',
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

Trail.hasMany(Image);         
Image.belongsTo(Trail);   

User.belongsToMany(Trail, { through: 'User_Trails', timestamps: false }); 
Trail.belongsToMany(User, { through: 'User_Trails', timestamps: false }); 

export { sequelize, User, Trail, Image };

export const initDB = async () => {
    await sequelize.sync();
    console.log('Database synchronized');
    return { sequelize, User, Trail, Image };
};

export default initDB;
