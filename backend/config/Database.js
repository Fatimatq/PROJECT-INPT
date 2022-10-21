import { Sequelize } from "sequelize";
const db = new Sequelize('auth_db', 'root', 'Fatima1234', {
    host: "localhost",
    dialect: "mysql"
});

export default db;