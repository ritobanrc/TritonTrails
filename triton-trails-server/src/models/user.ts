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
import { UserTrail, Trail } from '../createTable';

// User model
@Table({
    tableName: 'Users',
    timestamps: false,
})
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Unique
    @AllowNull(false)
    @Column
    username!: string;

    @AllowNull(false)
    @Column
    displayName!: string;

    @AllowNull(false)
    @Column
    passwordHash!: string;

    @AllowNull(false)
    @Column
    passwordSalt!: string;

    @BelongsToMany(() => Trail, () => UserTrail)
    trails!: Trail[];
}
