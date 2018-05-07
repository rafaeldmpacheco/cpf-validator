import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as jsonWebToken from 'jsonwebtoken';
import ValidateRouter from "./routes/validate-route";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        let corsMiddleware = express.Router();
        corsMiddleware.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Methods, ' +
                'Authorization, ' +
                'Access-Control-Allow-Headers, ' +
                'Access-Control-Allow-Origin, ' +
                'X-Requested-With, ' +
                'content-type, ' +
                'X-Auth-Token');

            if ('OPTIONS' == req.method) {
                res.send(200);
            } else {
                next();
            }
        });
        this.express.use('/api/validate', corsMiddleware, ValidateRouter);
    }

}

export default new App().express;