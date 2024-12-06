import { Sequelize } from 'sequelize-typescript';
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    Unique,
    AllowNull,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import { User } from './user'
import { Trail } from './trail'

// Junction table for User-Trail relationship
@Table({
    tableName: 'User_Trails',
    timestamps: false,
})
export class UserTrail extends Model {
    @ForeignKey(() => User)
    @Column
    UserId!: number;

    @ForeignKey(() => Trail)
    @Column
    TrailId!: number;

    @Column
    rating?: number;
}
