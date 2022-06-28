import { connect } from "../../resume_api/config/db.config";
import { APILogger } from '../../resume_api/logger/api.logger';
import { Resume } from "../model/resume.model";
import { ResumeData } from "../model/resumedata.model";
const { Op } = require("sequelize");

export class ResumeRepository {

    private logger: APILogger;
    private db: any = {};
    private ResumeRespository: any;
    private ResumeDataRespository: any;

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync().then(() => {
            console.log("Drop and re-sync db.");
        });
        this.db.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
        this.ResumeRespository = this.db.sequelize.getRepository(Resume);
        this.ResumeDataRespository = this.db.sequelize.getRepository(ResumeData);
    }

    async getResume(id) {

        try {
            const Resume = await this.ResumeRespository.findByPk(id);
            let data: Array<any> = await this.ResumeDataRespository.findAll({
                where: {
                  resume_id: id
                }
              });
            console.log('Resume:::', Resume, data);
            return {Resume, data};
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createResume(Resume) {
        let data = {};
        try {
            data = await this.ResumeRespository.create(Resume);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async addExp(ResumeData) {
        let data = {};
        try {
            data = await this.ResumeDataRespository.create(ResumeData);
        } catch(err) {
            this.logger.error('Error::' + err);
        }

        return data;
    }

    async search(ResumeDataArray) {
        let data = {}
        try {
            // Build a list of resume ids and send back
            // if contains some or all of desired features
            // check data - names and descriptions
            for (let rd of ResumeDataArray.values) {
                let results: Array<any> = await this.ResumeDataRespository.findAll({
                    where: {
                        title:{[Op.substring]: rd.title}
                    }
                });           
            }

        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

}