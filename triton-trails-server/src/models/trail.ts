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
import { Image } from './image'
import { Route } from './route'
import { UserTrail } from './user-trail'
import { User } from './user'

// Trail model
@Table({
    tableName: 'Trails',
    timestamps: false,
})
export class Trail extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    name!: string;

    @AllowNull(false)
    @Column
    description!: string;

    @Column
    image?: string;

    @BelongsToMany(() => User, () => UserTrail)
    users!: User[];

    @HasMany(() => Image)
    images!: Image[];

    @HasMany(() => Route)
    routes!: Route[];
}
