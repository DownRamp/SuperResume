import { connect } from "../config/db.config";
import { APILogger } from '../logger/api.logger';
import { Resume } from "../model/resume.model";

export class ResumeRepository {

    private logger: APILogger;
    private db: any = {};
    private ResumeRespository: any;

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
        this.ResumeRespository = this.db.sequelize.getRepository(Resume);
    }

    async getResume(id) {

        try {
            const Resume = await this.ResumeRespository.findById(id);
            console.log('Resume:::', Resume);
            return Resume;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createResume(Resume) {
        let data = {};
        try {
            Resume.createdate = new Date().toISOString();
            data = await this.ResumeRespository.create(Resume);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async addExp(Resume) {
        let data = {};
        try {
            Resume.updateddate = new Date().toISOString();
            data = await this.ResumeRespository.update({...Resume}, {
                where: {
                    id: Resume.id
                }
            });
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async search(Resume) {
        let data = {};
        try {
            data = await this.ResumeRespository.destroy({
                where: {
                    id: Resume
                }
            });
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

}