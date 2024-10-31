import { Model, DataTypes } from 'sequelize';
import sequelize from './database';

// exclamation marks bypass typescript warnings
// we should add an id field to Trail
export class TrailModel extends Model {
    public name!: string;
    public description!: string;
    public image!: string | null;
}

// initializing table
TrailModel.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
    }, {
    tableName: 'trails',
    sequelize,
});
