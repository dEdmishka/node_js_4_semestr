import express, {NextFunction, Request, Response} from 'express';
import {config} from "./config/config.js";
import {HttpError} from 'http-errors';
import morgan from 'morgan';
import {userRouter} from "./routes/users.router.js";
import bodyParser from "body-parser";
import {postRouter} from "./routes/posts.router.js";
import {appDataSource} from "./services/database.services.js";

export class Server {

    private app = express();
    private port = config.port;

    start() {
        // init database
        this.initDataBase();
        // init middlewares
        this.initMiddlewares();
        // init routes
        this.initRoutes();
        // init error handling
        this.initErrorHandling();
        // start listening
        this.startListening();
    };
    private initDataBase() {
        appDataSource
            .initialize()
            .then(() => {
                console.log('DB has been initialized');
            }).catch((err) => {
            console.log('DB has been thrown error: ', err);
        });
    }

    private initMiddlewares() {
        this.app.use(express.json({
            limit: "5mb",
            type: ['application/json', 'text/plain']
        }));
        this.app.use(morgan("tiny"));
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    };

    private initRoutes() {
        this.app.use('/api/users', userRouter);
        this.app.use('/api/posts', postRouter);
    };

    private initErrorHandling() {
        this.app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
            console.log(err);
            const statusCode = err.status || 500;
            res.status(statusCode).send({
                message: err.message,
                statusCode: statusCode
            });
        });
    };

    private startListening() {
        this.app.listen(this.port, () => {
            console.log('Server started listening on port ' + this.port);
        });
    };

}