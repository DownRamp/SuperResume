import { APILogger } from '../logger/api.logger';
import { ResumeService } from '../service/resume.service';

export class ResumeController {

    private resumeService: ResumeService;
    private logger: APILogger;

    constructor() {
        this.resumeService = new ResumeService();
        this.logger = new APILogger()
    }

    async getResume(id) {
        this.logger.info('Controller: getResume', id)
        return await this.resumeService.getResume(id);
    }

    async createResume(resume) {
        this.logger.info('Controller: createresume', resume);
        return await this.resumeService.createResume(resume);
    }

    async search(resume) {
        this.logger.info('Controller: Search', resume);
        return await this.resumeService.search(resume);
    }

    async addExp(resume) {
        this.logger.info('Controller: add experience', resume);
        return await this.resumeService.addExp(resume);
    }
}