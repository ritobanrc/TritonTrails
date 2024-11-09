import sqlite3 from "sqlite3";
import { Sequelize, DataTypes } from "sequelize";
import { open } from "sqlite";

const initDB = async () => {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'database.sqlite'
    });

    //await db.exec(`
    //CREATE TABLE IF NOT EXISTS trails (
        //id TEXT PRIMARY KEY,
        //name TEXT NOT NULL,
        //description TEXT NOT NULL,
        //image TEXT
    //);
    //`);


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


    return sequelize;
};

export default initDB;
