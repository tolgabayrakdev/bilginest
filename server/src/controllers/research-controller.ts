import { Request, Response } from "express";
import { Exception } from "../exceptions/exception";
import { ResearchService } from "../services/research-service";


export class ResearchController {

    private researchService: ResearchService;

    constructor() {
        this.researchService = new ResearchService();
    }

    public createResearch = async (req: Request, res: Response) => {
        try {
            const newResearch = await this.researchService.create(req.body, req.user.id);
            res.status(201).json(newResearch);
        } catch (error) {
            if (error instanceof Exception) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error!' });
            }
        }
    }

    public listResearch = async (req: Request, res: Response) => {
        try {
            const researchList = await this.researchService.list(req.user.id);
            res.status(200).json(researchList);
        } catch (error) {
            if (error instanceof Exception) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error!' });
            }
        }
    }

    public showResearch = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const research = await this.researchService.show(parseInt(id));
            res.status(200).json(research);
        } catch (error) {
            if (error instanceof Exception) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error!' });
            }
        }
    }

    public deleteResearch = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.researchService.delete(parseInt(id));
            res.status(204).send();
        } catch (error) {
            if (error instanceof Exception) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error!' });
            }
        }
    }

    public updateResearch = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const updatedResearch = await this.researchService.update(parseInt(id), req.body);
            res.status(200).json(updatedResearch);
        } catch (error) {
            if (error instanceof Exception) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error!' });
            }
        }
    }

}