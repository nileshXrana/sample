import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { AdminSeeder } from './seeds/admin.seeder';


export const AppDataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    migrationsRun: true,
    logging: false,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    seeds: [__dirname + '/seeds/*{.ts,.js}'],
};

export const AppDataSource = new DataSource(AppDataSourceOptions);