import { DataTypes, Model } from 'sequelize';
import db  from '../config/database.config';




export interface TodoAttributes {
    id: string;
    description: string;
    completed: Boolean;
    userId: string;

}

export class TodoInstance extends Model<TodoAttributes> {}

    TodoInstance.init({
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },

       description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        userId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        }

    },

    {sequelize: db, tableName: 'todo'}
    );
