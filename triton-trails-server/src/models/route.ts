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
import { Trail } from './trail'

// Route model
@Table({
    tableName: 'Routes',
    timestamps: false,
})
export class Route extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    startLatitude!: number;

    @AllowNull(false)
    @Column
    startLongitude!: number;

    @AllowNull(false)
    @Column
    endLatitude!: number;

    @AllowNull(false)
    @Column
    endLongitude!: number;

    @ForeignKey(() => Trail)
    @Column
    TrailId?: number;

    @BelongsTo(() => Trail)
    trail?: Trail;
}


