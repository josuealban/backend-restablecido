import { DataSource } from 'typeorm';
import { Historial } from './src/historial/entities/historial.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
port: Number(process.env.DB_PORT),
username: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  subscribers: [],
});
