import { DataTypes, Model } from 'sequelize';
import db  from '../config/database.config';




export interface UserAttributes {
    id: number;
    firstName: string;
    email: string;
    password: string;

}

export class UserInstance extends Model<UserAttributes> {}

    UserInstance.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {sequelize: db, tableName: 'user'}
    )
