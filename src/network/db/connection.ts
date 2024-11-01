import mysql from 'mysql2/promise';
import postgres from 'postgres'

let pool:mysql.Pool  
if(!process.env.ENV){
  pool= mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: Number(process.env.DB_PORT),
  });
}

// db.js

const connectionString = process.env.DATABASE_URL
export const sql = postgres(connectionString?connectionString:"")


export default pool