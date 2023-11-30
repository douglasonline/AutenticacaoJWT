import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";

//const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'postgres',
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT , 10) : 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'postgres',
    //Pasta entidade e pega todas as extenções ts e js
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
})

