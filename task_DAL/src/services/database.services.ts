import {DataSource} from "typeorm";
import {config} from "../config/config.js";

export const appDataSource = new DataSource({
    type: "postgres",
    host: <string>config.db_host,
    port: parseInt(<string>config.db_port),
    username: <string>config.db_name,
    password: <string>config.db_password,
    database: <string>config.db,
    entities: ["./src/models/entities/**.ts"],
    synchronize: true,
});