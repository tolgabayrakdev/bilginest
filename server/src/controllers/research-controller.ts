import { Request, Response } from "express";
import { Exception } from "../exceptions/exception";
import { ResearchService } from "../services/research-service";

// Araştırma için temel tipi tanımla
type Research = {
    title: string;
    abstract: string;
    content: string;
    results: string;
    sources: string;
    created_at?: Date;
    updated_at?: Date;
};

// Research oluşturmak için request tipi
type CreateResearchRequest = {
    title: string;
    abstract: string;
    content: string;
    results: string;
    sources: string;
    categories?: number[]; // Kategori ID'leri
    tags?: number[];       // Tag ID'leri
};

type UpdateResearchRequest = {
    title?: string;
    abstract?: string;
    content?: string;
    results?: string;
    sources?: string;
    categories?: number[]; // Kategori ID'leri
    tags?: number[];       // Tag ID'leri
}



export class ResearchController {
    private researchService: ResearchService;

    constructor() {
        this.researchService = new ResearchService();
    }

    public createResearch = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, abstract, content, results, sources, categories, tags }: CreateResearchRequest = req.body;

            // Validasyon
            if (!title || !abstract || !content || !results || !sources) {
                res.status(400).json({ message: "All research fields are required." });
            }

            const newResearch = await this.researchService.create(
                { title, abstract, content, results, sources, created_at: new Date(), updated_at: new Date() },
                req.user.id,
                categories || [],
                tags || []
            );
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

    public listAllResearch = async (req: Request, res: Response) => {
        try {
            const researchList = await this.researchService.listAll();
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
            res.status(204).send({ message: 'Research has been deleted.' });
        } catch (error) {
            if (error instanceof Exception) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error!' });
            }
        }
    }

    public updateResearch = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const { title, abstract, content, results, sources, categories, tags }: UpdateResearchRequest = req.body;

            // Validasyon
            if (!title || !abstract || !content || !results || !sources) {
                res.status(400).json({ message: "All research fields are required." });
            }

            const updatedResearch = await this.researchService.update(parseInt(id), {
                title: title ?? '',
                abstract: abstract ?? '',
                content: content ?? '',
                results: results ?? '',
                sources: sources ?? '',
                created_at: new Date(),
                updated_at: new Date()
            });

            // Kategoriler ve etiketler güncellenmek istenirse burada handle edilebilir

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
