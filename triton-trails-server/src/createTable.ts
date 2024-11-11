import sqlite3 from "sqlite3";
import { Sequelize, DataTypes } from "sequelize";
import { open } from "sqlite";

const initDB = async () => {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'database.sqlite'
    });

    const Trail = sequelize.define(
        'Trail',
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
            }
        }, 
        {
            timestamps: false
        }
    );
    const Image = sequelize.define(
        'Image',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            image: {
                type: DataTypes.BLOB('long'),
                allowNull: false,
            }
        },
        {
            timestamps: false
        }
    );
    Trail.hasMany(Image);  // creates a TrailId column in the Image table
    Image.belongsTo(Trail);  

    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
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
            timestamps: false
        }
    );
    User.belongsToMany(Trail, { through: 'User_Trails', timestamps: false });
    Trail.belongsToMany(User, { through: 'User_Trails',  timestamps: false  });

    await sequelize.sync();


    //const trail = await Trail.create({
      //name: "foo",
      //description: "",
    //});

    //const img = await Image.create({
        //image: "hello world",
    //});
    //trail.addImage(img);


    return sequelize;
};

export default initDB;
