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

// Image model
@Table({
    tableName: 'Images',
    timestamps: false,
})
export class Image extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    image!: Buffer;

    @ForeignKey(() => Trail)
    @Column
    TrailId?: number;

    @BelongsTo(() => Trail)
    trail?: Trail;
}

