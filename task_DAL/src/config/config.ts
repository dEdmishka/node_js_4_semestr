import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env['PORT'],
    db: process.env['DATABASE'],
    db_host: process.env['DATABASE_HOST'],
    db_port: process.env['DATABASE_PORT'],
    db_name: process.env['DATABASE_USERNAME'],
    db_password: process.env['DATABASE_PASSWORD'],
};