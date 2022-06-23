import { ResumeRepository } from '../repository/resume.repository';

export class ResumeService {

    private ResumeRepository: ResumeRepository;

    constructor() {
        this.ResumeRepository = new ResumeRepository();
    }

    async getResume(id) {
        return await this.ResumeRepository.getResume(id);
    }

    async createResume(Resume) {
        return await this.ResumeRepository.createResume(Resume);
    }

    async addExp(Resume) {
        return await this.ResumeRepository.addExp(Resume);
    }

    async search(Resume) {
        return await this.ResumeRepository.search(Resume);
    }

}