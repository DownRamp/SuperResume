import * as bodyParser from "body-parser";
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import { ResumeController } from "./controller/resume.controller";
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import 'dotenv/config'

class App {

    public express: express.Application;
    public logger: APILogger;
    public resumeController: ResumeController;

    /* Swagger files start */
    private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);
    /* Swagger files end */


    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
        this.resumeController = new ResumeController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get('/api/resume/:id', async(req, res) => {
            let id:string = req.params.id; 
            await this.resumeController.getResume(id).then(data => res.json(data));
        });

        this.express.post('/api/resume/search', async (req, res) => {
            console.log(req.body);
            await this.resumeController.search(req.body.search).then(data => res.json(data));
        });

        this.express.post('/api/resume', async (req, res) => {
            console.log(req.body);
            await this.resumeController.createResume(req.body.create).then(data => res.json(data));
        });

        this.express.post('/api/resume/exp', async (req, res) => {
            console.log(req.body);
            await this.resumeController.addExp(req.body.resumeData).then(data => res.json(data));
        });

        this.express.get("/", async (req, res, next) => {
            res.send("App works!!");
        });

        // swagger docs
        this.express.use('/api/docs', swaggerUi.serve,
            swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;